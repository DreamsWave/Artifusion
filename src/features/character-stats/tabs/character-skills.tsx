import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { useCharacter } from "@/hooks/artifacts/use-character";
import { getProgress } from "@/lib/utils";
import { Axe, Beef, Fish, Gem, Pickaxe, Shield, Sword } from "lucide-react";

const CharacterSkills = ({ name }: { name: string }) => {
  const { data: character } = useCharacter(name);
  if (!character) return null;
  return (
    <TabsContent value="skills" className="mt-0">
      <ScrollArea className="h-[360px]">
        <div className="flex items-center gap-2 px-2 py-2 pr-4">
          <Pickaxe className="mx-2 h-6 w-6" />
          <div className="flex w-full flex-col gap-1">
            <div className="flex gap-1">
              <h4>Mining</h4>
              <span>
                (Level {character.mining_level}): {character.mining_xp}/
                {character.mining_max_xp} XP
              </span>
            </div>
            <Progress
              value={getProgress(character.mining_max_xp, character.mining_xp)}
            />
          </div>
        </div>
        <Separator />
        <div className="flex items-center gap-2 px-2 py-2 pr-4">
          <Axe className="mx-2 h-6 w-6" />
          <div className="flex w-full flex-col gap-1">
            <div className="flex gap-1">
              <h4>Woodcutting</h4>
              <span>
                (Level {character.woodcutting_level}):{" "}
                {character.woodcutting_xp}/{character.woodcutting_max_xp} XP
              </span>
            </div>
            <Progress
              value={getProgress(
                character.woodcutting_max_xp,
                character.woodcutting_xp,
              )}
            />
          </div>
        </div>
        <Separator />
        <div className="flex items-center gap-2 px-2 py-2 pr-4">
          <Fish className="mx-2 h-6 w-6" />
          <div className="flex w-full flex-col gap-1">
            <div className="flex gap-1">
              <h4>Fishing</h4>
              <span>
                (Level {character.fishing_level}): {character.fishing_xp}/
                {character.fishing_max_xp} XP
              </span>
            </div>
            <Progress
              value={getProgress(
                character.fishing_max_xp,
                character.fishing_xp,
              )}
            />
          </div>
        </div>
        <Separator />
        <div className="flex items-center gap-2 px-2 py-2 pr-4">
          <Sword className="mx-2 h-6 w-6" />
          <div className="flex w-full flex-col gap-1">
            <div className="flex gap-1">
              <h4>Weaponcrafting</h4>
              <span>
                (Level {character.weaponcrafting_level}):{" "}
                {character.weaponcrafting_xp}/{character.weaponcrafting_max_xp}{" "}
                XP
              </span>
            </div>
            <Progress
              value={getProgress(
                character.weaponcrafting_max_xp,
                character.weaponcrafting_xp,
              )}
            />
          </div>
        </div>
        <Separator />
        <div className="flex items-center gap-2 px-2 py-2 pr-4">
          <Shield className="mx-2 h-6 w-6" />
          <div className="flex w-full flex-col gap-1">
            <div className="flex gap-1">
              <h4>Gearcrafting</h4>
              <span>
                (Level {character.gearcrafting_level}):{" "}
                {character.gearcrafting_xp}/{character.gearcrafting_max_xp} XP
              </span>
            </div>
            <Progress
              value={getProgress(
                character.gearcrafting_max_xp,
                character.gearcrafting_xp,
              )}
            />
          </div>
        </div>
        <Separator />
        <div className="flex items-center gap-2 px-2 py-2 pr-4">
          <Gem className="mx-2 h-6 w-6" />
          <div className="flex w-full flex-col gap-1">
            <div className="flex gap-1">
              <h4>Jewelrycrafting</h4>
              <span>
                (Level {character.jewelrycrafting_level}):{" "}
                {character.jewelrycrafting_xp}/
                {character.jewelrycrafting_max_xp} XP
              </span>
            </div>
            <Progress
              value={getProgress(
                character.jewelrycrafting_max_xp,
                character.jewelrycrafting_xp,
              )}
            />
          </div>
        </div>
        <Separator />
        <div className="flex items-center gap-2 px-2 py-2 pr-4">
          <Beef className="mx-2 h-6 w-6" />
          <div className="flex w-full flex-col gap-1">
            <div className="flex gap-1">
              <h4>Cooking</h4>
              <span>
                (Level {character.cooking_level}): {character.cooking_xp}/
                {character.cooking_max_xp} XP
              </span>
            </div>
            <Progress
              value={getProgress(
                character.cooking_max_xp,
                character.cooking_xp,
              )}
            />
          </div>
        </div>
      </ScrollArea>
    </TabsContent>
  );
};

export default CharacterSkills;
