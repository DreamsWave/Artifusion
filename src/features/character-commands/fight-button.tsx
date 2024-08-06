import { Button } from "@/components/ui/button";
import { artifactsApi } from "@/lib/artifacts/artifacts-api";
import { runErrorToast, runSuccessToast } from "@/lib/toast";

export interface FightButtonProps {
  name: string;
}

const FightButton = ({ name }: FightButtonProps) => {
  async function handleFight() {
    try {
      const responseFight = await artifactsApi.myCharacters.fight(name);
      const { fight } = responseFight.data;

      const resultMessage = `The fight ended successfully. Result - ${fight.result}`;
      runSuccessToast(resultMessage, responseFight.data.cooldown.total_seconds);
    } catch (error) {
      runErrorToast(error);
    }
  }

  return (
    <Button onClick={handleFight} variant="outline">
      Fight
    </Button>
  );
};

export default FightButton;
