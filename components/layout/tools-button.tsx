"use client";

import { pacificaConfig } from "@/config/pacifica";
import { getErrorString } from "@/lib/error";
import { approvePacificaBuilderCode } from "@/lib/pacifica-account";
import { useWallet } from "@solana/wallet-adapter-react";
import { WrenchIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Spinner } from "../ui/spinner";

export function ToolsButton() {
  const { connected, publicKey, signMessage } = useWallet();
  const [isApprovingBuilderCode, setIsApprovingBuilderCode] = useState(false);

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
      console.error(`[Lib] Error: ${getErrorString(error)}`);
    } finally {
      setIsApprovingBuilderCode(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <WrenchIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-full">
        <DropdownMenuItem
          onClick={handleApproveBuilderCode}
          disabled={!connected || isApprovingBuilderCode}
        >
          {isApprovingBuilderCode && <Spinner />}
          Approve Builder Code
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
