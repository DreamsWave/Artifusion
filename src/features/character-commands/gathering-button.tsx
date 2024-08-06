import { Button } from "@/components/ui/button";
import { artifactsApi } from "@/lib/artifacts/artifacts-api";
import { runErrorToast, runSuccessToast } from "@/lib/toast";

export interface GatheringButtonProps {
  name: string;
}

const GatheringButton = ({ name }: GatheringButtonProps) => {
  async function handleGathering() {
    try {
      const responseGathering = await artifactsApi.myCharacters.gathering(name);
      const { details } = responseGathering.data;
      const resultMessage = `The gathering ended successfully. ${details.items[0].code} ${details.items[0].quantity} ${details.xp}XP`;
      runSuccessToast(
        resultMessage,
        responseGathering.data.cooldown.total_seconds,
      );
    } catch (error) {
      runErrorToast(error);
    }
  }

  return (
    <Button onClick={handleGathering} variant="outline">
      Gathering
    </Button>
  );
};

export default GatheringButton;
