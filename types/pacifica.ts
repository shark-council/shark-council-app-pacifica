export type PacificaOrderSide = "bid" | "ask";

export interface PacificaOrderTrigger {
  stop_price: string;
  limit_price: string;
  client_order_id: string;
}

export interface PacificaMarketOrderOperationData {
  symbol: string;
  amount: string;
  side: PacificaOrderSide;
  slippage_percent: string;
  reduce_only: boolean;
  client_order_id: string;
  take_profit?: PacificaOrderTrigger;
  stop_loss?: PacificaOrderTrigger;
}

export interface PacificaCreateMarketOrderInput extends PacificaMarketOrderOperationData {
  agent_wallet?: string | null;
  expiry_window?: number;
}

export interface PacificaCreateMarketOrderRequest extends PacificaMarketOrderOperationData {
  account: string;
  signature: string;
  timestamp: number;
  expiry_window: number;
  agent_wallet?: string | null;
}

export interface PacificaCreateMarketOrderResponse {
  order_id: number;
}

export interface PacificaSignatureMessage<TData> {
  data: TData;
  expiry_window: number;
  timestamp: number;
  type: string;
}
