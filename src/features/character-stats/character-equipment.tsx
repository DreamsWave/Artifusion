import { Button } from "@/components/ui/button";
import { useCharacter } from "@/hooks/artifacts/use-character";

const EquipmentSlot = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button className="flex h-full w-full text-xs" variant="outline">
      {children}
    </Button>
  );
};

const CharacterEquipment = ({ name }: { name: string }) => {
  const { data: character } = useCharacter(name);

  return (
    <div className="grid grid-cols-3 grid-rows-[repeat(5,_65px)] gap-2">
      <EquipmentSlot>Weapon</EquipmentSlot>
      <EquipmentSlot>Helmet</EquipmentSlot>
      <EquipmentSlot>Shield</EquipmentSlot>
      <EquipmentSlot>Body Armor</EquipmentSlot>
      <div className="flex justify-center p-1">
        <img
          src={`https://artifactsmmo.com/images/characters/${character?.skin}.png`}
          alt="character-skin"
        />
      </div>
      <EquipmentSlot>Amulet</EquipmentSlot>
      <EquipmentSlot>Leg Armor</EquipmentSlot>
      <EquipmentSlot>Boots</EquipmentSlot>
      <EquipmentSlot>Ring (1)</EquipmentSlot>
      <EquipmentSlot>Consumable (1)</EquipmentSlot>
      <EquipmentSlot>Consumable (2)</EquipmentSlot>
      <EquipmentSlot>Ring (2)</EquipmentSlot>
      <EquipmentSlot>Artifact (1)</EquipmentSlot>
      <EquipmentSlot>Artifact (2)</EquipmentSlot>
      <EquipmentSlot>Artifact (3)</EquipmentSlot>
    </div>
  );
};

export default CharacterEquipment;
