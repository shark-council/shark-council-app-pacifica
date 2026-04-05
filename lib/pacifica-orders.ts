import { pacificaConfig } from "@/config/pacifica";
import {
  buildPacificaSignatureMessage,
  serializePacificaSignatureMessage,
  toUtf8Bytes,
} from "@/lib/pacifica-signing";
import type {
  PacificaCreateMarketOrderInput,
  PacificaCreateMarketOrderRequest,
  PacificaCreateMarketOrderResponse,
  PacificaMarketOrderOperationData,
  PacificaSignMessage,
} from "@/types/pacifica";
import axios from "axios";
import bs58 from "bs58";

function buildMarketOrderOperationData(
  order: PacificaCreateMarketOrderInput,
): PacificaMarketOrderOperationData {
  return {
    symbol: order.symbol,
    amount: order.amount,
    side: order.side,
    slippage_percent: order.slippage_percent,
    reduce_only: order.reduce_only,
    client_order_id: order.client_order_id,
    ...(order.builder_code ? { builder_code: order.builder_code } : {}),
    ...(order.take_profit ? { take_profit: order.take_profit } : {}),
    ...(order.stop_loss ? { stop_loss: order.stop_loss } : {}),
  };
}

export async function createPacificaMarketOrder(args: {
  account: string;
  signMessage?: PacificaSignMessage;
  order: PacificaCreateMarketOrderInput;
}) {
  const { account, order, signMessage } = args;

  if (!signMessage) {
    throw new Error("Connected wallet does not support message signing.");
  }

  const timestamp = Date.now();
  const expiryWindow =
    order.expiry_window ??
    pacificaConfig.defaultMarketOrderCreationExpiryWindow;
  const operationData = buildMarketOrderOperationData(order);
  const signableMessage = buildPacificaSignatureMessage({
    data: operationData,
    expiryWindow,
    timestamp,
    type: pacificaConfig.operationTypes.createMarketOrder,
  });
  const serializedMessage = serializePacificaSignatureMessage(signableMessage);
  const signature = bs58.encode(
    await signMessage(toUtf8Bytes(serializedMessage)),
  );

  const requestBody: PacificaCreateMarketOrderRequest = {
    account,
    signature,
    timestamp,
    expiry_window: expiryWindow,
    ...operationData,
    ...(order.agent_wallet !== undefined
      ? { agent_wallet: order.agent_wallet }
      : {}),
  };

  const { data } = await axios.post<PacificaCreateMarketOrderResponse>(
    `${pacificaConfig.apiBaseUrl}/api/v1/orders/create_market`,
    requestBody,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return {
    response: data,
    requestBody,
    serializedMessage,
    signableMessage,
  };
}
