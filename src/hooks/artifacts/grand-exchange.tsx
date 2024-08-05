import { artifactsApi } from "@/lib/artifacts/artifacts-api";
import { useQuery } from "@tanstack/react-query";
import type { GetAllGrandExchangeApiQuery } from "artifacts-api-client";

export const useGrandExchangeGetAll = (
  params?: GetAllGrandExchangeApiQuery
) => {
  return useQuery({
    queryKey: ["artifacts/ge"],
    queryFn: async () => {
      const { data } = await artifactsApi.grandExchange.getAll(params);
      return data;
    },
  });
};

export const useGrandExchangeGet = (code: string) => {
  return useQuery({
    queryKey: ["artifacts/ge/{code}"],
    queryFn: async () => {
      const { data } = await artifactsApi.grandExchange.get(code);
      return data;
    },
  });
};
