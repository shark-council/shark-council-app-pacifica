import { pacificaConfig } from "@/config/pacifica";
import type { PacificaGetAccountInfoResponse } from "@/types/pacifica";
import axios from "axios";

export async function getPacificaAccountInfo(account: string) {
  const { data } = await axios.get<PacificaGetAccountInfoResponse>(
    `${pacificaConfig.apiBaseUrl}/api/v1/account`,
    {
      params: { account },
    },
  );

  return data;
}
