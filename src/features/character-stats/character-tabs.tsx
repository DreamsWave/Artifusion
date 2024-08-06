import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCharacter } from "@/hooks/artifacts/use-character";
import { getCooldown } from "@/lib/utils";

const CharacterTabs = ({ name }: { name: string }) => {
  const { data: character } = useCharacter(name);

  if (!character) return null;

  return (
    <Tabs defaultValue="main" className="p-2">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="main">Main</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="resatkdmg">Res/Atk/DMG</TabsTrigger>
      </TabsList>
      <TabsContent value="main">
        <p>X: {character.x}</p>
        <p>Y: {character.y}</p>
        <Separator />
        <p>Cooldown: {character.cooldown}</p>
        <p>
          Cooldown:{" "}
          {character.cooldown_expiration &&
            getCooldown(character.cooldown_expiration)}
        </p>
        <Separator />
        <p>Haste: {character.haste}</p>
        <p>Speed: {character.speed}</p>
        <p>Critical Strike: {character.critical_strike}</p>
        <Separator />
        <p>Task: {character.task}</p>
        <p>Task Progress: {character.task_progress}</p>
        <p>Task Total: {character.task_total}</p>
        <p>Task Type: {character.task_type}</p>
      </TabsContent>
      <TabsContent value="skills">
        <p>Cooking lvl: {character.cooking_level}</p>
        <p>Cooking XP: {character.cooking_xp}</p>
        <p>Cooking max XP: {character.cooking_max_xp}</p>
        <Separator />
        <p>Fishing lvl: {character.fishing_level}</p>
        <p>Fishing XP: {character.fishing_xp}</p>
        <p>Fishing max XP: {character.fishing_max_xp}</p>
        <Separator />
        <p>Mining lvl: {character.mining_level}</p>
        <p>Mining XP: {character.mining_xp}</p>
        <p>Mining max XP: {character.mining_max_xp}</p>
        <Separator />
        <p>Woodcutting lvl: {character.woodcutting_level}</p>
        <p>Woodcutting XP: {character.woodcutting_xp}</p>
        <p>Woodcutting max XP: {character.woodcutting_max_xp}</p>
        <Separator />
        <p>Gearcrft lvl: {character.gearcrafting_level}</p>
        <p>Gearcrft XP: {character.gearcrafting_xp}</p>
        <p>Gearcrft max XP: {character.gearcrafting_max_xp}</p>
        <Separator />
        <p>Jewelrycrft lvl: {character.jewelrycrafting_level}</p>
        <p>Jewelrycrft XP: {character.jewelrycrafting_xp}</p>
        <p>Jewelrycrft max XP: {character.jewelrycrafting_max_xp}</p>
        <Separator />
        <p>Weaponcrft lvl: {character.weaponcrafting_level}</p>
        <p>Weaponcrft XP: {character.weaponcrafting_xp}</p>
        <p>Weaponcrft max XP: {character.weaponcrafting_max_xp}</p>
      </TabsContent>
      <TabsContent value="resatkdmg">
        <p>Res Air: {character.res_air}</p>
        <p>Res Earth: {character.res_earth}</p>
        <p>Res Fire: {character.res_fire}</p>
        <p>Res Water: {character.res_water}</p>
        <Separator />
        <p>Attack Air: {character.attack_air}</p>
        <p>Attack Earth: {character.attack_earth}</p>
        <p>Attack Fire: {character.attack_fire}</p>
        <p>Attack Water: {character.attack_water}</p>
        <Separator />
        <p>DMG Air: {character.dmg_air}</p>
        <p>DMG Earth: {character.dmg_earth}</p>
        <p>DMG Fire: {character.dmg_fire}</p>
        <p>DMG Water: {character.dmg_water}</p>
      </TabsContent>
    </Tabs>
  );
};

export default CharacterTabs;
