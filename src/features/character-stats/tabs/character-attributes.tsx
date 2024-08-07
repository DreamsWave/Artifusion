import { Button } from "@/components/ui/button";
import {
  CollapsibleContent,
  Collapsible as CollapsibleShadcn,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { useCharacter } from "@/hooks/artifacts/use-character";
import { getCooldown } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";

export const Collapsible = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <CollapsibleShadcn defaultOpen={true}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex w-full flex-row justify-between p-0 px-4"
        >
          <span className="font-bold">{title}</span>
          <ChevronsUpDown className="h-4 w-4" />
          <span className="sr-only">Toggle {title}</span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-2">{children}</CollapsibleContent>
    </CollapsibleShadcn>
  );
};

const CharacterAttributes = ({ name }: { name: string }) => {
  const { data: character } = useCharacter(name);
  if (!character) return null;
  return (
    <TabsContent value="attributes" className="mt-2">
      <ScrollArea className="h-[360px]">
        <div className="flex flex-col gap-2">
          <Collapsible title="Main">
            <div>
              <span>Position: </span>
              <span>{`X: ${character.x} Y: ${character.y}`}</span>
            </div>
            <p>Cooldown: {character.cooldown}</p>
            <p>
              Current cooldown:{" "}
              {character.cooldown_expiration &&
                getCooldown(character.cooldown_expiration)}
            </p>
            <p>Haste: {character.haste}</p>
            <p>Speed: {character.speed}</p>
            <p>Critical Strike: {character.critical_strike}</p>
            <p>Task: {character.task}</p>
            <p>Task Progress: {character.task_progress}</p>
            <p>Task Total: {character.task_total}</p>
            <p>Task Type: {character.task_type}</p>
          </Collapsible>

          <Collapsible title="Attack">
            <p>Air: {character.attack_air}</p>
            <p>Earth: {character.attack_earth}</p>
            <p>Fire: {character.attack_fire}</p>
            <p>Water: {character.attack_water}</p>
          </Collapsible>
          <Collapsible title="Damage">
            <p>Air: {character.dmg_air}</p>
            <p>Earth: {character.dmg_earth}</p>
            <p>Fire: {character.dmg_fire}</p>
            <p>Water: {character.dmg_water}</p>
          </Collapsible>
          <Collapsible title="Resistance">
            <p>Air: {character.res_air}</p>
            <p>Earth: {character.res_earth}</p>
            <p>Fire: {character.res_fire}</p>
            <p>Water: {character.res_water}</p>
          </Collapsible>
        </div>
      </ScrollArea>
    </TabsContent>
  );
};

export default CharacterAttributes;
