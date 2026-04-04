import { Cluster } from "@solana/web3.js";

export const solanaConfig = {
  cluster: "devnet" as Cluster,
  endpoint: "https://api.devnet.solana.com",
} as const;
