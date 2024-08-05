import { type ClassValue, clsx } from "clsx";
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
