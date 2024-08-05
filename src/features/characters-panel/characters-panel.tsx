import { Card, CardContent } from "@/components/ui/card";
import CreateCharacterDialog from "@/features/characters-panel/create-character-dialog";
import { useMyCharactersGetAll } from "@/hooks/artifacts/my-characters";

const CharactersPanel = () => {
  const { data } = useMyCharactersGetAll();
  const hasMaximumCharacters = data?.length === 5;

  return (
    <div className="flex flex-wrap gap-2 p-2">
      {data?.map((character) => (
        <Card key={character.name}>
          <CardContent className="p-3">
            <div className="flex gap-2">
              <h3 className="max-w-28 truncate font-bold">{character.name}</h3>
              <span>lv.{character.level}</span>
              <span>
                {character.xp}/{character.max_xp}XP
              </span>
            </div>
            <div className="flex gap-2">
              <span>{character.hp}HP</span>
              <span>{character.stamina}SP</span>
              <span className="italic">idling</span>
            </div>
          </CardContent>
        </Card>
      ))}
      {!hasMaximumCharacters && <CreateCharacterDialog />}
    </div>
  );
};

export default CharactersPanel;
