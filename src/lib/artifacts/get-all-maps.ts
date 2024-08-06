import { artifactsApi } from "@/lib/artifacts/artifacts-api";
import type {
  ArtifactsMaps,
  ArtifactsMapsScheme,
  MapType,
} from "@/types/artifacts.types";
import { ArtifactsError } from "artifacts-api-client";
import { toast } from "sonner";

export const getAllMaps = async () => {
  const maps = {} as ArtifactsMapsScheme;
  const allMaps = [] as ArtifactsMaps;

  // Fetching maps from api
  try {
    const { data, pages } = await artifactsApi.maps.getAll({ size: 100 });
    allMaps.push(...data);
    if (pages && pages > 1) {
      for (let i = 2; i < pages; i++) {
        const { data } = await artifactsApi.maps.getAll({ page: i, size: 100 });
        allMaps.push(...data);
      }
    }
  } catch (error) {
    if (error instanceof ArtifactsError) {
      toast.error(error.message);
    }
  }

  // Filtering maps and creating maps object
  if (allMaps.length > 0) {
    for (const map of allMaps) {
      if (map.content?.type) {
        const type = map.content.type as MapType;
        maps[type] = allMaps.filter(
          (mp) => mp.content?.type === type && mp.content !== null,
        );
      }
      maps.empty = allMaps.filter((mp) => mp.content === null);
    }
  }

  return maps;
};
