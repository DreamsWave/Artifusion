import { artifactsApi } from "@/lib/artifacts/artifacts-api";
import { useQuery } from "@tanstack/react-query";
import type { GetAllEventsApiQuery } from "artifacts-api-client";

export const useEventsGetAll = (params?: GetAllEventsApiQuery) => {
  return useQuery({
    queryKey: ["artifacts/events"],
    queryFn: async () => {
      const { data } = await artifactsApi.events.getAll(params);
      return data;
    },
  });
};
