import type { PacificaOrderSide } from "@/types/pacifica";

export type ChatMessageRole =
  | "user"
  | "orchestrator"
  | "sentiment-expert"
  | "technical-expert";

export type ChatMessageType = "thinking" | "tool-call" | "message" | "final";

export type ChatUiMessageType = ChatMessageType;

export type ChatPacificaVerdictAction = {
  kind: "pacifica-market-order";
  defaults: {
    symbol: string;
    amount: string;
    side: PacificaOrderSide;
  };
};

export type ChatMessage = {
  id: string;
  role: ChatMessageRole;
  content: string;
  type: ChatMessageType;
  action?: ChatPacificaVerdictAction;
};

export type ChatUiMessage = {
  id: string;
  role: ChatMessageRole;
  content: string;
  type: ChatUiMessageType;
  action?: ChatPacificaVerdictAction;
};
