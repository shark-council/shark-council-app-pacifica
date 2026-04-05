export const pacificaConfig = {
  appBaseUrl: "https://test-app.pacifica.fi",
  apiBaseUrl: "https://test-api.pacifica.fi",
  defaultExpiryWindow: 30_000,
  operationTypes: {
    createMarketOrder: "create_market_order",
  },
} as const;
