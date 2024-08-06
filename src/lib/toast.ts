import { ArtifactsError } from "artifacts-api-client";
import { toast } from "sonner";

export const runErrorToast = (error: unknown) => {
  if (error instanceof ArtifactsError) {
    toast.warning(error.message);
  } else {
    console.log(error);
    toast.error("Unknown error occurred");
  }
};

export const runSuccessToast = (message: string, cooldown?: number) => {
  const cooldownMessage = cooldown
    ? `\nCooldown: ${Math.round(cooldown)} sec`
    : "";

  toast.success(`${message}${cooldownMessage}`);
};
