"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { pacificaConfig } from "@/config/pacifica";
import { handleError } from "@/lib/error";
import {
  approvePacificaBuilderCode,
  getPacificaAccountInfo,
} from "@/lib/pacifica-account";
import { createPacificaMarketOrder } from "@/lib/pacifica-orders";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { toast } from "sonner";

export default function PacificaPage() {
  const { connected, publicKey, signMessage } = useWallet();
  const [isGettingAccountInfo, setIsGettingAccountInfo] = useState(false);
  const [isApprovingBuilderCode, setIsApprovingBuilderCode] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  async function handleGetAccountInfo() {
    if (isGettingAccountInfo) {
      return;
    }

    try {
      console.log("[Component] Getting account info...");

      const account = publicKey?.toBase58();

      if (!connected || !account) {
        throw new Error("Connect a Solana wallet before creating an order");
      }

      setIsGettingAccountInfo(true);

      const response = await getPacificaAccountInfo(account);

      console.log("[Component] Account info:", response);

      toast.success("Account info retrieved", {
        description: "Check the console for details",
      });
    } catch (error) {
      handleError({ error, toastTitle: "Failed to get account info" });
    } finally {
      setIsGettingAccountInfo(false);
    }
  }

  async function handleApproveBuilderCode() {
    if (isApprovingBuilderCode) {
      return;
    }

    try {
      console.log("[Component] Approving builder code...");

      const account = publicKey?.toBase58();

      if (!connected || !account) {
        throw new Error(
          "Connect a Solana wallet before approving a builder code",
        );
      }

      setIsApprovingBuilderCode(true);

      const { response, requestBody, signableMessage } =
        await approvePacificaBuilderCode({
          account,
          signMessage,
          approval: {
            builder_code: pacificaConfig.defaultBuilderCode,
            max_fee_rate: pacificaConfig.defaultBuilderMaxFeeRate,
            agent_wallet: null,
          },
        });

      console.log(
        "[Component] Builder code approval request body:",
        requestBody,
      );
      console.log(
        "[Component] Builder code approval signable message:",
        signableMessage,
      );
      console.log("[Component] Builder code approval response:", response);

      toast.success("Builder code approved", {
        description: "Check the console for details",
      });
    } catch (error) {
      handleError({ error, toastTitle: "Failed to approve builder code" });
    } finally {
      setIsApprovingBuilderCode(false);
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
        throw new Error("Connect a Solana wallet before creating an order");
      }

      setIsCreatingOrder(true);

      const { response, requestBody, signableMessage } =
        await createPacificaMarketOrder({
          account,
          signMessage,
          order: {
            symbol: pacificaConfig.defaultSymbol,
            amount: pacificaConfig.defaultAmount,
            side: pacificaConfig.defaultSide,
            slippage_percent: pacificaConfig.defaultSlippagePercent,
            reduce_only: pacificaConfig.defaultReduceOnly,
            client_order_id: crypto.randomUUID(),
            builder_code: pacificaConfig.defaultBuilderCode,
          },
        });

      console.log("[Component] Market order request body:", requestBody);
      console.log(
        "[Component] Market order signable message:",
        signableMessage,
      );
      console.log("[Component] Market order response:", response);

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
          onClick={handleApproveBuilderCode}
          disabled={!connected || isApprovingBuilderCode}
        >
          {isApprovingBuilderCode && <Spinner />}
          Approve Builder Code
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
