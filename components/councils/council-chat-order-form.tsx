"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { pacificaConfig } from "@/config/pacifica";
import { handleError } from "@/lib/error";
import { createPacificaMarketOrder } from "@/lib/pacifica-orders";
import type { ChatPacificaVerdictAction } from "@/types/chat";
import type { PacificaOrderSide } from "@/types/pacifica";
import { useWallet } from "@solana/wallet-adapter-react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";

const ORDER_SIDES: { label: string; value: PacificaOrderSide }[] = [
  { label: "Buy", value: "bid" },
  { label: "Sell", value: "ask" },
];

function normalizedSideLabel(side: PacificaOrderSide) {
  return side === "bid" ? "Buy" : "Sell";
}

function buildPacificaTradeUrl(symbol: string) {
  return new URL(`/trade/${symbol}`, pacificaConfig.appBaseUrl).toString();
}

export function CouncilChatOrderForm(props: {
  action: ChatPacificaVerdictAction;
}) {
  const { connected, publicKey, signMessage } = useWallet();
  const [symbol, setSymbol] = useState(props.action.defaults.symbol);
  const [amount, setAmount] = useState(props.action.defaults.amount);
  const [side, setSide] = useState<PacificaOrderSide>(
    props.action.defaults.side,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    try {
      const account = publicKey?.toBase58();

      if (!connected || !account) {
        throw new Error("Connect a Solana wallet before creating an order.");
      }

      setIsSubmitting(true);

      const normalizedSymbol = symbol.trim().toUpperCase();
      const normalizedAmount = amount.trim();

      if (!normalizedSymbol || !normalizedAmount) {
        throw new Error("Provide both a symbol and amount before submitting.");
      }

      const { response, requestBody, signableMessage } =
        await createPacificaMarketOrder({
          account,
          signMessage,
          order: {
            symbol: normalizedSymbol,
            amount: normalizedAmount,
            side,
            slippage_percent: pacificaConfig.defaultSlippagePercent,
            reduce_only: pacificaConfig.defaultReduceOnly,
            client_order_id: crypto.randomUUID(),
          },
        });

      console.log("[Council Chat] Market order request body:", requestBody);
      console.log(
        "[Council Chat] Market order signable message:",
        signableMessage,
      );
      console.log("[Council Chat] Market order response:", response);

      toast.success("Market order created", {
        description: `${normalizedSideLabel(side)} ${normalizedAmount} ${normalizedSymbol} on Pacifica`,
        action: {
          label: "Open Pacifica App",
          onClick: () => {
            window.open(
              buildPacificaTradeUrl(normalizedSymbol),
              "_blank",
              "noopener,noreferrer",
            );
          },
        },
      });
    } catch (error) {
      handleError({ error, toastTitle: "Failed to create market order" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card size="sm" className="mt-4 border border-border/70 bg-background/70">
      <CardHeader>
        <CardTitle>Execute on Pacifica</CardTitle>
        <CardDescription>
          Review the order details, choose a side, and sign with your connected
          wallet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Symbol
              </span>
              <Input
                value={symbol}
                onChange={(event) => setSymbol(event.target.value)}
                placeholder={pacificaConfig.defaultSymbol}
                autoComplete="off"
                required
                disabled={isSubmitting}
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Amount
              </span>
              <Input
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                inputMode="decimal"
                placeholder={pacificaConfig.defaultAmount}
                autoComplete="off"
                required
                disabled={isSubmitting}
              />
            </label>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">
              Side
            </span>
            <div className="grid grid-cols-2 gap-2">
              {ORDER_SIDES.map((option) => {
                const isActive = side === option.value;

                return (
                  <Button
                    key={option.value}
                    type="button"
                    variant={isActive ? "default" : "outline"}
                    onClick={() => setSide(option.value)}
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t pt-4">
            <p className="text-xs text-muted-foreground">
              {connected
                ? "Your connected wallet will sign this market order"
                : "Connect a Solana wallet to submit this market order"}
            </p>
            <Button type="submit" disabled={!connected || isSubmitting}>
              {isSubmitting && <Spinner />}
              Execute Order
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
