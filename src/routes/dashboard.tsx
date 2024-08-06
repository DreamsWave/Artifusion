import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CharacterCommandsPanel from "@/features/character-commands/character-commands-panel";
import CharacterStats from "@/features/character-stats/character-stats";
import CreateCharacterDialog from "@/features/create-character-dialog";
import { useMyCharactersGetAll } from "@/hooks/artifacts/my-characters";

const DashboardPage = () => {
  const { data, isFetched } = useMyCharactersGetAll();
  const hasMaximumCharacters = data?.length === 5;

  if (!isFetched)
    return (
      <div className="grid grid-cols-5 gap-2 p-2">
        <Skeleton className="h-12 w-auto" />
        <Skeleton className="h-12 w-auto" />
        <Skeleton className="h-12 w-auto" />
        <Skeleton className="h-12 w-auto" />
        <Skeleton className="h-12 w-auto" />
      </div>
    );

  return (
    <main>
      <Tabs defaultValue={data?.[0].name} className="p-2">
        <TabsList className="h-fit w-full bg-transparent p-0">
          <div className="grid w-full grid-cols-5 justify-between gap-2">
            {data?.map((character) => (
              <TabsTrigger key={character.name} value={character.name} asChild>
                <Button
                  variant="outline"
                  className="inline-flex h-fit flex-col"
                >
                  <h3 className="max-w-28 truncate font-bold">
                    {character.name}
                  </h3>
                  <span className="italic">idling</span>
                </Button>
              </TabsTrigger>
            ))}
            {!hasMaximumCharacters && <CreateCharacterDialog />}
          </div>
        </TabsList>

        {data?.map((character) => (
          <TabsContent key={character.name} value={character.name}>
            <div className="grid gap-2">
              <CharacterCommandsPanel characters={[character]} />
              <CharacterStats name={character.name} />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
};

export default DashboardPage;
