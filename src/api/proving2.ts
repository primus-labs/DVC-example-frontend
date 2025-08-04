// src/lib/proveTaskClient.ts
import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

import { ProvingNetwork } from "../generated/proving_network_connect"; // 会自动生成
import { ProveTaskRequest } from "../generated/proving_network"; // 包含 message 类型

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080", // 注意替换成你的 gRPC 网关地址
});

export const proveTaskClient = createPromiseClient(ProvingNetwork, transport);
