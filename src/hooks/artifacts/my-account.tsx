import { artifactsApi } from "@/lib/artifacts/artifacts-api";
import { useQuery } from "@tanstack/react-query";
import type { GetBankItemsApiQuery } from "artifacts-api-client";

export const useMyAccountGetBankItems = (params?: GetBankItemsApiQuery) => {
  return useQuery({
    queryKey: ["artifacts/my/bank/items"],
    queryFn: async () => {
      const { data } = await artifactsApi.myAccount.getBankItems(params);
      return data;
    },
  });
};

export const useMyAccountGetBankGolds = () => {
  return useQuery({
    queryKey: ["artifacts/my/bank/gold"],
    queryFn: async () => {
      const { data } = await artifactsApi.myAccount.getBankGold();
      return data;
    },
  });
};
