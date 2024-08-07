import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CharacterAttributes from "@/features/character-stats/tabs/character-attributes";
import CharacterSkills from "@/features/character-stats/tabs/character-skills";
import { useCharacter } from "@/hooks/artifacts/use-character";

const CharacterTabs = ({ name }: { name: string }) => {
  const { data: character } = useCharacter(name);

  if (!character) return null;

  return (
    <Tabs defaultValue="skills" className="p-2">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="attributes">Attributes</TabsTrigger>
      </TabsList>
      <CharacterSkills name={name} />
      <CharacterAttributes name={name} />
    </Tabs>
  );
};

export default CharacterTabs;
