"use client";

import { Separator } from "@/components/ui/separator";
import { formatWalletAddress } from "@/lib/solana";
import { useWallet } from "@solana/wallet-adapter-react";

export default function WalletPage() {
  const { connected, publicKey } = useWallet();
  const walletAddress = publicKey?.toBase58() ?? null;

  return (
    <main className="max-w-xl mx-auto px-4 py-8">
      <h2 className="max-w-md text-3xl font-bold tracking-tight">Wallet</h2>
      <Separator className="mt-4" />
      <div className="mt-6 rounded-2xl border bg-card p-5 shadow-sm">
        {connected && walletAddress ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Connected wallet</p>
              <p className="mt-1 text-lg font-semibold tracking-tight">
                {formatWalletAddress(walletAddress)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Public address</p>
              <p className="mt-2 break-all rounded-xl bg-muted px-3 py-3 font-mono text-sm text-foreground">
                {walletAddress}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-lg font-semibold tracking-tight">
              No wallet connected
            </p>
            <p className="text-sm text-muted-foreground">
              Connect your Phantom or other Solana wallet from the header to see
              your public address here.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
