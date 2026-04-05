import { pacificaConfig } from "@/config/pacifica";
import {
  buildPacificaSignatureMessage,
  serializePacificaSignatureMessage,
  toUtf8Bytes,
} from "@/lib/pacifica-signing";
import type {
  PacificaApproveBuilderCodeInput,
  PacificaApproveBuilderCodeOperationData,
  PacificaApproveBuilderCodeRequest,
  PacificaApproveBuilderCodeResponse,
  PacificaGetAccountInfoResponse,
  PacificaSignMessage,
} from "@/types/pacifica";
import axios from "axios";
import bs58 from "bs58";

function buildApproveBuilderCodeOperationData(
  input: PacificaApproveBuilderCodeInput,
): PacificaApproveBuilderCodeOperationData {
  return {
    builder_code: input.builder_code,
    max_fee_rate: input.max_fee_rate,
  };
}

export async function getPacificaAccountInfo(account: string) {
  const { data } = await axios.get<PacificaGetAccountInfoResponse>(
    `${pacificaConfig.apiBaseUrl}/api/v1/account`,
    {
      params: { account },
    },
  );

  return data;
}

export async function approvePacificaBuilderCode(args: {
  account: string;
  signMessage?: PacificaSignMessage;
  approval: PacificaApproveBuilderCodeInput;
}) {
  const { account, approval, signMessage } = args;

  if (!signMessage) {
    throw new Error("Connected wallet does not support message signing.");
  }

  const timestamp = Date.now();
  const expiryWindow =
    approval.expiry_window ??
    pacificaConfig.defaultBuilderCodeApprovalExpiryWindow;
  const operationData = buildApproveBuilderCodeOperationData(approval);
  const signableMessage = buildPacificaSignatureMessage({
    data: operationData,
    expiryWindow,
    timestamp,
    type: pacificaConfig.operationTypes.approveBuilderCode,
  });
  const serializedMessage = serializePacificaSignatureMessage(signableMessage);
  const signature = bs58.encode(
    await signMessage(toUtf8Bytes(serializedMessage)),
  );

  const requestBody: PacificaApproveBuilderCodeRequest = {
    account,
    signature,
    timestamp,
    expiry_window: expiryWindow,
    ...operationData,
    ...(approval.agent_wallet !== undefined
      ? { agent_wallet: approval.agent_wallet }
      : {}),
  };

  const { data } = await axios.post<PacificaApproveBuilderCodeResponse>(
    `${pacificaConfig.apiBaseUrl}/api/v1/account/builder_codes/approve`,
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
