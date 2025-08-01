import * as jspb from 'google-protobuf'

import * as google_protobuf_duration_pb from 'google-protobuf/google/protobuf/duration_pb'; // proto import: "google/protobuf/duration.proto"
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb'; // proto import: "google/protobuf/empty.proto"


export class ProveTaskRequest extends jspb.Message {
  getInputsList(): Array<string>;
  setInputsList(value: Array<string>): ProveTaskRequest;
  clearInputsList(): ProveTaskRequest;
  addInputs(value: string, index?: number): ProveTaskRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProveTaskRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ProveTaskRequest): ProveTaskRequest.AsObject;
  static serializeBinaryToWriter(message: ProveTaskRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProveTaskRequest;
  static deserializeBinaryFromReader(message: ProveTaskRequest, reader: jspb.BinaryReader): ProveTaskRequest;
}

export namespace ProveTaskRequest {
  export type AsObject = {
    inputsList: Array<string>,
  }
}

export class ProveTaskResponse extends jspb.Message {
  getTaskId(): string;
  setTaskId(value: string): ProveTaskResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProveTaskResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ProveTaskResponse): ProveTaskResponse.AsObject;
  static serializeBinaryToWriter(message: ProveTaskResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProveTaskResponse;
  static deserializeBinaryFromReader(message: ProveTaskResponse, reader: jspb.BinaryReader): ProveTaskResponse;
}

export namespace ProveTaskResponse {
  export type AsObject = {
    taskId: string,
  }
}

