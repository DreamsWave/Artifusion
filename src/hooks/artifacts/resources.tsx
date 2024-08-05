import { artifactsApi } from "@/lib/artifacts/artifacts-api";
import { useQuery } from "@tanstack/react-query";
import type { GetAllResourcesApiQuery } from "artifacts-api-client";

export const useResourcesGetAll = (params?: GetAllResourcesApiQuery) => {
  return useQuery({
    queryKey: ["artifacts/resources"],
    queryFn: async () => {
      const { data } = await artifactsApi.resources.getAll(params);
      return data;
    },
  });
};

export const useResourcesGet = (code: string) => {
  return useQuery({
    queryKey: ["artifacts/resources/{code}"],
    queryFn: async () => {
      const { data } = await artifactsApi.resources.get(code);
      return data;
    },
  });
};
