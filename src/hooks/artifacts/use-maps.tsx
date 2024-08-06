import { getAllMaps } from "@/lib/artifacts/get-all-maps";
import { useQuery } from "@tanstack/react-query";

export const useMaps = () => {
  return useQuery({
    queryKey: ["artifacts/get-maps"],
    queryFn: getAllMaps,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
