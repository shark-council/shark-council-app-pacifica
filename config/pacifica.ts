export const pacificaConfig = {
  appBaseUrl: "https://test-app.pacifica.fi",
  apiBaseUrl: "https://test-api.pacifica.fi",
  defaultExpiryWindow: 30_000,
  defaultSymbol: "ETH",
  defaultAmount: "0.1",
  defaultSide: "bid",
  defaultSlippagePercent: "0.5",
  defaultReduceOnly: false,
  operationTypes: {
    createMarketOrder: "create_market_order",
  },
} as const;
