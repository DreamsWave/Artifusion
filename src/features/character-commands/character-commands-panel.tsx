import FightButton from "@/features/character-commands/fight-button";
import GatheringButton from "@/features/character-commands/gathering-button";
import MoveDropdown from "@/features/character-commands/move-dropdown/move-dropdown";
import type { ArtifactsCharacters } from "@/types/artifacts.types";

export interface CharacterCommandsPanelProps {
  characters: ArtifactsCharacters;
}

const CharacterCommandsPanel = ({
  characters,
}: CharacterCommandsPanelProps) => {
  const [character] = characters;

  return (
    <div className="flex w-full gap-2">
      <MoveDropdown name={character.name} />
      <FightButton name={character.name} />
      <GatheringButton name={character.name} />
    </div>
  );
};

export default CharacterCommandsPanel;
