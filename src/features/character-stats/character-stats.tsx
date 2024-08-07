import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import CharacterEquipment from "@/features/character-stats/character-equipment";
import CharacterTabs from "@/features/character-stats/character-tabs";
import ExperienceBar from "@/features/character-stats/experience-bar";
import { useCharacter } from "@/hooks/artifacts/use-character";
import { useMaps } from "@/hooks/artifacts/use-maps";
import {
  getCooldown,
  getMapByCoordinates,
  getMapName,
  getProgress,
} from "@/lib/utils";
import { Coins, Heart, Leaf, Locate } from "lucide-react";

export interface CharacterStatsProps {
  name: string;
}

const CharacterStats = ({ name }: CharacterStatsProps) => {
  const { data: character, isFetched } = useCharacter(name);
  const { data: maps } = useMaps();
  const currentMap =
    character && maps
      ? getMapByCoordinates({ x: character.x, y: character.y }, maps)
      : null;
  const currentMapName = currentMap ? getMapName(currentMap) : null;

  if (!character) {
    return <div>Character not found</div>;
  }

  if (!isFetched) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader className="p-0">
        <div className="relative">
          <div className="relative z-10 flex gap-2 p-2 px-4">
            <div className="w-40">
              <h2 className="truncate text-xl font-bold">{character.name}</h2>
            </div>
            <Badge variant="outline" className="gap-2 text-base">
              <Heart className="h-4 w-4 fill-red-600 stroke-red-600" />
              {character.hp}
            </Badge>
            <Badge variant="outline" className="gap-2 text-base">
              <Leaf className="h-4 w-4 fill-green-600 stroke-green-600" />
              {character.stamina}
            </Badge>
            <Badge variant="outline" className="gap-2 text-base">
              <Coins className="h-4 w-4 fill-yellow-600 stroke-yellow-600" />
              {character.gold}
            </Badge>
            <Badge variant="outline" className="gap-2 text-base">
              <Locate className="h-4 w-4 fill-blue-600 stroke-blue-600" />
              {`x: ${character.x} y: ${character.y}`} {currentMapName}
            </Badge>
          </div>
          {character.cooldown_expiration && (
            <Progress
              value={getProgress(
                character.cooldown,
                getCooldown(character.cooldown_expiration),
              )}
              className="absolute left-0 top-0 z-0 m-0 h-full w-full rounded-b-none rounded-t-md p-0 opacity-5"
            />
          )}
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <div className="grid h-fit grid-cols-[1fr_1px_1fr]">
          <div className="flex flex-col gap-2 px-4 pb-4 pt-2">
            <ExperienceBar name={character.name} />
            <CharacterEquipment name={character.name} />
          </div>
          <Separator orientation="vertical" />
          <div>
            <div>
              <CharacterTabs name={character.name} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterStats;
