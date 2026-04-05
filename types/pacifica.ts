export type PacificaOrderSide = "bid" | "ask";

export type PacificaSignMessage = (message: Uint8Array) => Promise<Uint8Array>;

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

export interface PacificaApproveBuilderCodeOperationData {
  builder_code: string;
  max_fee_rate: string;
}

export interface PacificaApproveBuilderCodeInput extends PacificaApproveBuilderCodeOperationData {
  agent_wallet?: string | null;
  expiry_window?: number;
}

export interface PacificaApproveBuilderCodeRequest extends PacificaApproveBuilderCodeOperationData {
  account: string;
  signature: string;
  timestamp: number;
  expiry_window: number;
  agent_wallet?: string | null;
}

export interface PacificaApproveBuilderCodeResponseData {
  builder_code: string;
  max_fee_rate: string;
  updated_at?: number;
}

export interface PacificaApproveBuilderCodeResponse {
  success: boolean;
  data: PacificaApproveBuilderCodeResponseData | null;
  error: string | null;
  code: number | null;
}

export interface PacificaAccountInfo {
  balance: string;
  fee_level: number;
  maker_fee: string;
  taker_fee: string;
  account_equity: string;
  available_to_spend: string;
  available_to_withdraw: string;
  pending_balance: string;
  total_margin_used: string;
  cross_mmr: string;
  positions_count: number;
  orders_count: number;
  stop_orders_count: number;
  updated_at: number;
  use_ltp_for_stop_orders: boolean;
}

export interface PacificaGetAccountInfoResponse {
  success: boolean;
  data: PacificaAccountInfo;
  error: string | null;
  code: number | null;
}

export interface PacificaSignatureMessage<TData> {
  data: TData;
  expiry_window: number;
  timestamp: number;
  type: string;
}
