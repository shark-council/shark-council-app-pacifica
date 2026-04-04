"use client";

import { solanaConfig } from "@/config/solana";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import type { Cluster } from "@solana/web3.js";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

export function SolanaProvider({ children }: { children: React.ReactNode }) {
  const cluster = solanaConfig.cluster as Cluster;
  const endpoint = solanaConfig.endpoint || clusterApiUrl(cluster);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
