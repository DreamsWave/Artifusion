import type {
  ArtifactsMap,
  ArtifactsMapsScheme,
} from "@/types/artifacts.types";
import { type ClassValue, clsx } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateKey = (pre: string) => {
  return `${pre}_${new Date().getTime()}`;
};

export const setTokenToLocalStorage = (token: string) => {
  localStorage.setItem("token", token);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const getProgress = (total: number, current: number) => {
  const progress = (current / total) * 100;
  return Math.floor(progress);
};

export const getCooldown = (cooldownExpiration: string) => {
  const expirationMoment = moment(cooldownExpiration);
  const nowMoment = moment();
  const secondsLeft = expirationMoment.diff(nowMoment, "seconds");
  return secondsLeft > 0 ? secondsLeft : 0;
};

export const getMapByCoordinates = (
  { x, y }: { x: number; y: number },
  maps: ArtifactsMapsScheme,
) => {
  return maps.all.find((map) => map.x === x && map.y === y);
};

export const getMapName = (map: ArtifactsMap) => {
  return map?.content?.code ?? map?.name;
};
