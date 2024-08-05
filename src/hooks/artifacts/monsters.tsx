import { artifactsApi } from "@/lib/artifacts/artifacts-api";
import { useQuery } from "@tanstack/react-query";
import type { GetAllMonstersApiQuery } from "artifacts-api-client";

export const useMonstersGetAll = (params?: GetAllMonstersApiQuery) => {
  return useQuery({
    queryKey: ["artifacts/monsters"],
    queryFn: async () => {
      const { data } = await artifactsApi.monsters.getAll(params);
      return data;
    },
  });
};

export const useMonstersGet = (code: string) => {
  return useQuery({
    queryKey: ["artifacts/monsters/{code}"],
    queryFn: async () => {
      const { data } = await artifactsApi.monsters.get(code);
      return data;
    },
  });
};
