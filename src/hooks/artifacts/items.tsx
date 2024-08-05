import { artifactsApi } from "@/lib/artifacts/artifacts-api";
import { useQuery } from "@tanstack/react-query";
import type { GetAllItemsApiQuery } from "artifacts-api-client";

export const useItemsGetAll = (params?: GetAllItemsApiQuery) => {
  return useQuery({
    queryKey: ["artifacts/items"],
    queryFn: async () => {
      const { data } = await artifactsApi.items.getAll(params);
      return data;
    },
  });
};

export const useItemsGet = (code: string) => {
  return useQuery({
    queryKey: ["artifacts/items/{code}"],
    queryFn: async () => {
      const { data } = await artifactsApi.items.get(code);
      return data;
    },
  });
};
