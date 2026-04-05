import { pacificaConfig } from "@/config/pacifica";
import { ApiResponse } from "@/types/api";
import { ChatPacificaVerdictAction } from "@/types/chat";
import { ChatOpenAI } from "@langchain/openai";
import { BaseMessage, HumanMessage, SystemMessage } from "langchain";
import z from "zod";

type AgentRole = "sentiment-expert" | "technical-expert";

type DebateEntry = {
  role: AgentRole;
  content: string;
};

type DebateRound = {
  agent: AgentRole;
  thinkingLabel: string;
  instruction: string;
};

const BASE_URL = process.env.BASE_URL;
const THINKING_DELAY_MS = 2200;
const MESSAGE_DELAY_MS = 1400;

const model = new ChatOpenAI({
  model: "google/gemini-3-flash-preview",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
  temperature: 0.7,
});

const DEBATE_ROUNDS: DebateRound[] = [
  {
    agent: "sentiment-expert",
    thinkingLabel: "Sentiment Expert is sizing up the room...",
    instruction:
      "Open the debate. State your position on this topic. What does the crowd say?",
  },
  {
    agent: "technical-expert",
    thinkingLabel: "Technical Expert is pulling up the charts...",
    instruction:
      "Respond to Sentiment Expert directly. What does the chart say? Challenge their specific claims.",
  },
  {
    agent: "sentiment-expert",
    thinkingLabel: "Sentiment Expert is firing back...",
    instruction:
      "Push back on Technical Expert's specific technical arguments. Why are they missing the bigger picture?",
  },
  {
    agent: "technical-expert",
    thinkingLabel: "Technical Expert is checking the data one more time...",
    instruction:
      "Final word. Stand your ground or concede specific points — but be clear about the risk here.",
  },
];

const VERDICT_SYSTEM_PROMPT = `
- You are the Shark Council Orchestrator — a sharp, decisive risk arbiter.
- You have just witnessed a live debate between Sentiment Expert and Technical Expert.
- Return both a clear verdict and a structured Pacifica trade suggestion.
- The verdict must explain who made the stronger case, what the risk verdict is, and what the trader should do.
- Keep the verdict to 3-5 sentences.
- Format the verdict into 2 short paragraphs with a blank line between them.
- The structured trade suggestion must include symbol, amount, and side.
- Choose a symbol that matches the debate topic when possible.
- Choose a practical amount as a string, not a number.
- If the debate supports waiting instead of acting, still provide the best tentative trade setup rather than leaving fields blank.
- Be authoritative. No hedging.
`;

const verdictSchema = z.object({
  verdict: z.string().min(1),
  trade: z.object({
    symbol: z.string().min(1).describe("Trading symbol, such as ETH or SOL"),
    amount: z
      .string()
      .min(1)
      .describe("Suggested order size as a string, such as 0.1"),
    side: z
      .enum(["bid", "ask"])
      .describe("Use bid for buy ideas and ask for sell ideas"),
  }),
});

const structuredVerdictModel = model.withStructuredOutput(verdictSchema, {
  name: "shark_council_verdict",
  method: "jsonSchema",
});

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function callAgent(role: AgentRole, prompt: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/agents/${role}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: prompt }),
  });
  const data: ApiResponse<{ response: string }> = await res.json();
  if (!data.isSuccess || !data.data) {
    throw new Error(`${role} returned an error`);
  }
  return data.data.response;
}

function buildAgentPrompt(
  userTopic: string,
  history: DebateEntry[],
  instruction: string,
): string {
  let prompt = `Topic under debate: "${userTopic}"\n\n`;
  if (history.length > 0) {
    prompt += "Debate so far:\n";
    for (const entry of history) {
      const name =
        entry.role === "sentiment-expert"
          ? "Sentiment Expert"
          : "Technical Expert";
      prompt += `${name}: ${entry.content}\n\n`;
    }
  }
  prompt += `Your move: ${instruction}`;
  return prompt;
}

function buildVerdictPrompt(userTopic: string, history: DebateEntry[]): string {
  let transcript = `Topic: "${userTopic}"\n\nDebate transcript:\n`;
  for (const entry of history) {
    const name =
      entry.role === "sentiment-expert"
        ? "Sentiment Expert"
        : "Technical Expert";
    transcript += `${name}: ${entry.content}\n\n`;
  }
  transcript += "Deliver your verdict.";
  return transcript;
}

function extractUserTopic(messages: BaseMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].type === "human") {
      const content = messages[i].content;
      return typeof content === "string" ? content : JSON.stringify(content);
    }
  }
  return "Unknown topic";
}

function buildPacificaVerdictAction(args: {
  symbol: string;
  amount: string;
  side: "bid" | "ask";
}): ChatPacificaVerdictAction {
  const normalizedSymbol = normalizeTradeSymbol(args.symbol);
  const normalizedAmount = normalizeTradeAmount(args.amount);

  return {
    kind: "pacifica-market-order",
    defaults: {
      symbol: normalizedSymbol,
      amount: normalizedAmount,
      side: args.side,
    },
  };
}

function normalizeTradeSymbol(symbol: string) {
  const normalized = symbol.trim().toUpperCase();

  if (!normalized) {
    return pacificaConfig.defaultSymbol;
  }

  return normalized.replace(/[^A-Z0-9_-]/g, "") || pacificaConfig.defaultSymbol;
}

function normalizeTradeAmount(amount: string) {
  const normalized = amount.trim();

  if (!normalized) {
    return pacificaConfig.defaultAmount;
  }

  return normalized;
}

export async function* streamOrchestrator(
  messages: BaseMessage[],
): AsyncGenerator<string> {
  const userTopic = extractUserTopic(messages);
  const debateHistory: DebateEntry[] = [];

  // Run the debate rounds sequentially
  for (const round of DEBATE_ROUNDS) {
    yield `data: ${JSON.stringify({
      role: "orchestrator",
      type: "tool-call",
      content: round.thinkingLabel,
    })}\n\n`;

    await delay(THINKING_DELAY_MS);

    const prompt = buildAgentPrompt(
      userTopic,
      debateHistory,
      round.instruction,
    );
    const response = await callAgent(round.agent, prompt);

    debateHistory.push({ role: round.agent, content: response });

    yield `data: ${JSON.stringify({
      role: round.agent,
      type: "message",
      content: response,
    })}\n\n`;

    await delay(MESSAGE_DELAY_MS);
  }

  // Orchestrator delivers the verdict
  yield `data: ${JSON.stringify({
    role: "orchestrator",
    type: "tool-call",
    content: "The Council deliberates...",
  })}\n\n`;

  await delay(THINKING_DELAY_MS);

  const verdictPrompt = buildVerdictPrompt(userTopic, debateHistory);
  const verdictResponse = await structuredVerdictModel.invoke([
    new SystemMessage(VERDICT_SYSTEM_PROMPT),
    new HumanMessage(verdictPrompt),
  ]);

  yield `data: ${JSON.stringify({
    role: "orchestrator",
    type: "final",
    content: verdictResponse.verdict,
    action: buildPacificaVerdictAction(verdictResponse.trade),
  })}\n\n`;

  yield `data: [DONE]\n\n`;
}
