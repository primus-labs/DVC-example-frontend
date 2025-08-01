// src/api/proving.ts
import { ProvingNetworkClient } from "../generated/Proving_networkServiceClientPb.ts";
import { ProveTaskRequest } from "../generated/proving_network_pb.d";

const client = new ProvingNetworkClient(
  "http://101.36.119.14:20150",
  null,
  null
);

export const callProveTask = async (inputs: string[]) => {
  const request = new ProveTaskRequest();
  request.setInputsList(inputs);

  return new Promise<string>((resolve, reject) => {
    client.proveTask(request, {}, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.getTaskId());
      }
    });
  });
};
