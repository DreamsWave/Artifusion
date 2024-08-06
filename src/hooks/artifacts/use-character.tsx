import { useMyCharactersGetAll } from "@/hooks/artifacts/my-characters";

export const useCharacter = (name: string) => {
  const characters = useMyCharactersGetAll();
  const character = characters?.data?.find((c) => c.name === name);
  return { ...characters, data: character };
};
