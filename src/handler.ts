/* eslint-disable @typescript-eslint/no-unused-vars */
import "dotenv/config";
import type { HandlerParams } from "./types";
import getFormattedDate from "./lib/dateformat";
import generateResponse from "./lib/gemini";

export default async function messageHandler({
  socket,
  m,
  sessionName,
}: HandlerParams) {
  try {
    // console.log(JSON.stringify(m, null, 2));

    const formattedDate = getFormattedDate();
    const ownerNumber = process.env.OWNER_NUMBER || "";

    const { messages, type } = m;
    if (type !== "notify") return;

    const msg = messages[0];

    const { key, pushName, broadcast, message } = msg;
    const messageTimestamp = msg.messageTimestamp;
    const { remoteJid, fromMe, participant } = key;
    const body =
      message?.conversation ||
      message?.imageMessage?.caption ||
      message?.videoMessage?.caption ||
      message?.extendedTextMessage?.text ||
      message?.documentMessage?.caption ||
      message?.documentWithCaptionMessage?.message?.documentMessage?.caption ||
      message?.viewOnceMessageV2?.message?.conversation ||
      message?.viewOnceMessageV2?.message?.imageMessage?.caption ||
      message?.viewOnceMessageV2?.message?.videoMessage?.caption;
    const isGroup = remoteJid?.endsWith("@g.us");
    const isOwner =
      (isGroup ? participant : remoteJid) === ownerNumber + "@s.whatsapp.net";

    const groupId = isGroup ? remoteJid : "";

    const sendMessage = (text: string, reply: boolean = true) =>
      socket.sendMessage(
        remoteJid!,
        { text },
        { quoted: reply ? msg : undefined }
      );

    if (fromMe) return; // abaikan pesan dari bot untuk menghindari loop

    if (!isGroup) {
      console.log(`${formattedDate} [${sessionName}] ${pushName}: ${body}`);
      // Respon pesan private chat dengan gemini
      const response = await generateResponse(body!, pushName!);
      return sendMessage(response, false);
    }
  } catch (error) {
    console.error(error);
  }
}
