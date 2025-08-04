import { ProvingNetworkClient } from "../grpc/proving_network.client";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";

// Create the transport layer
const transport = new GrpcWebFetchTransport({
  baseUrl: "http://101.36.119.14:20150",
  // baseUrl: "http://localhost:8080",
  // interceptors: [
  //   // Debug interceptor: print request and response information
  //   {
  //     interceptUnary(next) {
  //       return async (req, metadata, options) => {
  //         debugger
  //         console.log("gRPC request:", {
  //           service: req.service.typeName,
  //           method: req.method.name,
  //           input: req.input,
  //           url: transport.baseUrl,
  //         });

  //         try {
  //           const response = await next(req, metadata, options);
  //           console.log("gRPC response:", response);
  //           return response;
  //         } catch (err) {
  //           debugger
  //           console.error("gRPC Request failed.:", err);
  //           throw err;
  //         }
  //       };
  //     },
  //   },
  // ],
});

// Create a client
const client = new ProvingNetworkClient(transport);

// Call the ProveTask method
export const callProveTask = async (inputs: string[]): Promise<string> => {
  try {
    const options = {
      timeout: 5000,
    };
    const response = await client.proveTask(
      {
        inputs: inputs,
      },
      options
    );

    if (!response.response.taskId) {
      throw new Error("No task ID obtained.");
    }

    return response.response.taskId;
  } catch (error) {
    console.error("gRPC call error:", error);
    throw new Error(
      `Call ProveTask failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};
