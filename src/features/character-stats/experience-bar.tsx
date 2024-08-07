import { Progress } from "@/components/ui/progress";
import { useCharacter } from "@/hooks/artifacts/use-character";
import { getProgress } from "@/lib/utils";

const ExperienceBar = ({ name }: { name: string }) => {
  const { data: character } = useCharacter(name);

  if (!character) return null;

  return (
    <div className="relative flex h-8 gap-2">
      <div className="absolute z-10 flex h-8 w-8 items-center justify-center rounded-full border-[1px] border-foreground bg-background font-bold">
        {character?.level}
      </div>
      <Progress
        value={getProgress(character.max_xp, character.xp)}
        className="absolute left-6 top-4 h-6 w-[calc(100%-1.4rem)] -translate-y-1/2 rounded-l-lg"
      />
      <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 -translate-y-1/2 text-background drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        {getProgress(character.max_xp, character.xp)}% ({character?.xp}/
        {character?.max_xp})
      </div>
    </div>
  );
};

export default ExperienceBar;
