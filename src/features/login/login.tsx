import Link from "@/components/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getTokenFromLocalStorage, setTokenToLocalStorage } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  token: z.string().min(2, {
    message: "Token must be at least 2 characters.",
  }),
});

const Login = () => {
  const [token, setToken] = useState<string | null>(getTokenFromLocalStorage());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submit");
    setToken(values.token);
    setTokenToLocalStorage(values.token);
  }

  if (token) {
    return (
      <Button asChild>
        <RouterLink to="dashboard" className="mt-auto">
          Start
        </RouterLink>
      </Button>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-1 mb-2">
          Enter the token from your
          <Link
            href="https://artifactsmmo.com/account"
            target="_blank"
            rel="noreferrer"
          >
            artifactsmmo.com
          </Link>
          account
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Token" {...field} />
                  </FormControl>
                  <FormMessage />
                  <Button type="submit">Add</Button>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Login;
