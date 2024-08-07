import type {
  GetAllMapsApiResult,
  GetMapApiResult,
  GetMyCharactersApiResult,
} from "artifacts-api-client";

export type Skin = "men1" | "men2" | "men3" | "women1" | "women2" | "women3";
export type MapType =
  | "monster"
  | "resource"
  | "workshop"
  | "bank"
  | "grand_exchange"
  | "tasks_master"
  | "empty"
  | "all";

export type ArtifactsMap = GetMapApiResult["data"];
export type ArtifactsMaps = GetAllMapsApiResult["data"];
export type ArtifactsMapsScheme = {
  [key in MapType]: ArtifactsMaps;
};

export type ArtifactsCharacters = GetMyCharactersApiResult["data"];
