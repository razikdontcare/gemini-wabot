import makeWASocket, { type WAMessage, type MessageUpsertType } from "baileys";

/**
 * Interface representing the parameters passed to a handler.
 */
export interface HandlerParams {
  /**
   * The WebSocket connection instance created by `makeWASocket`.
   */
  socket: ReturnType<typeof makeWASocket>;

  /**
   * An object containing message details.
   */
  m: {
    /**
     * An array of WhatsApp messages.
     */
    messages: WAMessage[];

    /**
     * The type of message upsert event.
     */
    type: MessageUpsertType;

    /**
     * An optional request ID associated with the message.
     */
    requestId?: string;
  };

  /**
   * The name of the session.
   */
  sessionName: string;
}
