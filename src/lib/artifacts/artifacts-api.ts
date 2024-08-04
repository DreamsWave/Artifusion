import { ArtifactsApi } from "artifacts-api-client";

const token = import.meta.env.VITE_ARTIFACTS_TOKEN;

export const artifactsApi = ArtifactsApi.create({
  token,
});
