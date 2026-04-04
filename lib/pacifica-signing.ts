import type { PacificaSignatureMessage } from "@/types/pacifica";

type JsonRecord = Record<string, unknown>;

function isJsonRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function sortPacificaJsonKeys<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => sortPacificaJsonKeys(item)) as T;
  }

  if (!isJsonRecord(value)) {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([, entryValue]) => entryValue !== undefined)
      .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
      .map(([entryKey, entryValue]) => [
        entryKey,
        sortPacificaJsonKeys(entryValue),
      ]),
  ) as T;
}

export function buildPacificaSignatureMessage<TData>(args: {
  data: TData;
  expiryWindow: number;
  timestamp: number;
  type: string;
}): PacificaSignatureMessage<TData> {
  return sortPacificaJsonKeys({
    data: args.data,
    expiry_window: args.expiryWindow,
    timestamp: args.timestamp,
    type: args.type,
  });
}

export function serializePacificaSignatureMessage(value: unknown): string {
  return JSON.stringify(sortPacificaJsonKeys(value));
}

export function toUtf8Bytes(value: string): Uint8Array {
  return new TextEncoder().encode(value);
}
