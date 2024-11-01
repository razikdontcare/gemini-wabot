import makeWASocket, { type WAMessage, type MessageUpsertType } from "baileys";

export interface HandlerParams {
  socket: ReturnType<typeof makeWASocket>;
  m: {
    messages: WAMessage[];
    type: MessageUpsertType;
    requestId?: string;
  };
  sessionName: string;
}
