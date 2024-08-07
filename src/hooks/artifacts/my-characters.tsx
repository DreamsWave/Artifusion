import { artifactsApi } from "@/lib/artifacts/artifacts-api";
import { useQuery } from "@tanstack/react-query";
import type { GetLogsApiQuery } from "artifacts-api-client";

const refetchInterval =
  Number(import.meta.env.VITE_ARTIFACTS_CHARACTERS_REFETCH_INTERVAL) ?? 5000;

export const useMyCharactersGetLogs = (params?: GetLogsApiQuery) => {
  return useQuery({
    queryKey: ["artifacts/my/logs"],
    queryFn: async () => {
      const { data } = await artifactsApi.myCharacters.getLogs(params);
      return data;
    },
  });
};

export const useMyCharactersGetAll = () => {
  return useQuery({
    queryKey: ["artifacts/my/characters"],
    queryFn: async () => {
      const { data } = await artifactsApi.myCharacters.getAll();
      return data;
    },

    staleTime: refetchInterval + 5000,
    refetchInterval,
  });
};
