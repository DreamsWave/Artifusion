import { artifactsApi } from "@/lib/artifacts/artifacts-api";
import { useQuery } from "@tanstack/react-query";
import type { GetAllCharactersApiQuery } from "artifacts-api-client";

export const useCharactersGetAll = (params?: GetAllCharactersApiQuery) => {
  return useQuery({
    queryKey: ["artifacts/characters"],
    queryFn: async () => {
      const { data } = await artifactsApi.characters.getAll(params);
      return data;
    },
  });
};

export const useCharactersGet = (name: string) => {
  return useQuery({
    queryKey: ["artifacts/characters/{name}"],
    queryFn: async () => {
      const { data } = await artifactsApi.characters.get(name);
      return data;
    },
  });
};
