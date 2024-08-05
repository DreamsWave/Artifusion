import { artifactsApi } from "@/lib/artifacts/artifacts-api";
import { useQuery } from "@tanstack/react-query";

export const useGetStatus = () => {
  return useQuery({
    queryKey: ["artifacts"],
    queryFn: async () => {
      const { data } = await artifactsApi.getStatus();
      return data;
    },
  });
};
