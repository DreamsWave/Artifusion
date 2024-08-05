import { artifactsApi } from "@/lib/artifacts/artifacts-api";
import { useQuery } from "@tanstack/react-query";
import type { GetAllMapsApiQuery } from "artifacts-api-client";

export const useMapsGetAll = (params?: GetAllMapsApiQuery) => {
  return useQuery({
    queryKey: ["artifacts/maps"],
    queryFn: async () => {
      const { data } = await artifactsApi.maps.getAll(params);
      return data;
    },
  });
};

export const useMapsGet = (x: number, y: number) => {
  return useQuery({
    queryKey: ["artifacts/maps/{x}/{y}"],
    queryFn: async () => {
      const { data } = await artifactsApi.maps.get(x, y);
      return data;
    },
  });
};
