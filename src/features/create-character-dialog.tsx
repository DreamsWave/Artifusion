import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ACTIFACTS_SKINS } from "@/config/constants";
import { artifactsApi } from "@/lib/artifacts/artifacts-api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArtifactsError,
  type CreateCharacterApiBody,
} from "artifacts-api-client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Character name must be at least 3 characters.",
    })
    .max(12, {
      message: "Character name must be less than 12 characters.",
    })
    .refine(
      (value) => /^[a-zA-Z0-9_-]+$/.test(value ?? ""),
      "Name should contain only alphabets and numbers",
    ),
  skin: z.string().min(1, {
    message: "Please select a skin.",
  }),
});

const CreateCharacterDialog = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      skin: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const name = values.name as CreateCharacterApiBody["name"];
    const skin = values.skin as CreateCharacterApiBody["skin"];
    const newCharacter = { name, skin };
    try {
      const response = await artifactsApi.characters.create(newCharacter);
      console.log(response);
      toast.success(`Character ${name} created`);
    } catch (error) {
      if (error instanceof ArtifactsError) {
        if (error.code === 494) toast.warning(error.message);
        if (error.code === 495) toast.warning(error.message);
      } else {
        toast.error("An error occurred while creating the character.");
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Character</DialogTitle>
          <DialogDescription> </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-8 mt-4 flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormDescription> </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="skin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skin</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select skin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-64" ref={field.ref}>
                        {ACTIFACTS_SKINS.map((skin) => (
                          <SelectItem key={skin} value={skin}>
                            <img
                              src={`https://artifactsmmo.com/images/characters/${skin}.png`}
                              alt={`character skin ${skin}`}
                              className="h-6 w-6"
                            />
                            {skin}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormDescription> </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCharacterDialog;
