export const pacificaConfig = {
  appBaseUrl: "https://test-app.pacifica.fi",
  apiBaseUrl: "https://test-api.pacifica.fi",
  defaultBuilderCodeApprovalExpiryWindow: 5_000,
  defaultMarketOrderCreationExpiryWindow: 30_000,
  defaultBuilderCode: "SharkCouncil",
  defaultBuilderMaxFeeRate: "0.001",
  defaultSymbol: "ETH",
  defaultAmount: "0.1",
  defaultSide: "bid",
  defaultSlippagePercent: "0.5",
  defaultReduceOnly: false,
  operationTypes: {
    approveBuilderCode: "approve_builder_code",
    createMarketOrder: "create_market_order",
  },
} as const;
