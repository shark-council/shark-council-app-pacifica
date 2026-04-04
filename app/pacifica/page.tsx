"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { handleError } from "@/lib/error";
import { createPacificaMarketOrder } from "@/lib/pacifica-orders";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function PacificaPage() {
  const { connected, publicKey, signMessage } = useWallet();
  const [isGettingAccountInfo, setIsGettingAccountInfo] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  async function handleGetAccountInfo() {
    if (isGettingAccountInfo) {
      return;
    }

    try {
      console.log("[Component] Getting account info...");

      const account = publicKey?.toBase58();

      if (!connected || !account) {
        throw new Error("Connect a Solana wallet before creating an order.");
      }

      setIsGettingAccountInfo(true);

      const { data } = await axios.get(
        "https://test-api.pacifica.fi/api/v1/account",
        {
          params: { account: account },
        },
      );

      console.log("[Component] Account info:", data);

      toast.success("Account info retrieved", {
        description: "Check the console for details",
      });
    } catch (error) {
      handleError({ error, toastTitle: "Failed to get account info" });
    } finally {
      setIsGettingAccountInfo(false);
    }
  }

  async function handleCreateMarketOrder() {
    if (isCreatingOrder) {
      return;
    }

    try {
      console.log("[Component] Creating market order...");

      const account = publicKey?.toBase58();

      if (!connected || !account) {
        throw new Error("Connect a Solana wallet before creating an order.");
      }

      setIsCreatingOrder(true);

      const order = await createPacificaMarketOrder({
        account,
        signMessage,
        order: {
          symbol: "ETH",
          amount: "0.1",
          side: "bid",
          slippage_percent: "0.5",
          reduce_only: false,
          client_order_id: crypto.randomUUID(),
        },
      });

      console.log(
        "[Component] Market order signable message:",
        order.signableMessage,
      );
      console.log("[Component] Market order request body:", order.requestBody);
      console.log("[Component] Market order response:", order.data);

      toast.success("Market order created", {
        description: "Check the console for details",
      });
    } catch (error) {
      handleError({ error, toastTitle: "Failed to create market order" });
    } finally {
      setIsCreatingOrder(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-8">
      <h2 className="max-w-md text-3xl font-bold tracking-tight">Pacifica</h2>
      <Separator className="mt-4" />
      <div className="flex flex-col items-start gap-2 mt-4">
        <Button
          variant="secondary"
          onClick={handleGetAccountInfo}
          disabled={!connected || isGettingAccountInfo}
        >
          {isGettingAccountInfo && <Spinner />}
          Get Account Info
        </Button>
        <Button
          variant="secondary"
          onClick={handleCreateMarketOrder}
          disabled={!connected || isCreatingOrder}
        >
          {isCreatingOrder && <Spinner />}
          Create Market Order
        </Button>
      </div>
    </main>
  );
}
