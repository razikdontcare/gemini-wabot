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
    const body = message?.conversation || message?.extendedTextMessage?.text;
    const isGroup = remoteJid?.endsWith("@g.us");

    // gunakan variabel ini untuk menentukan apakah pengguna adalah pemilik bot (kembangkan sesuai kebutuhan. cth: tambah fitur yang hanya bisa diakses oleh pemilik bot)
    const isOwner =
      (isGroup ? participant : remoteJid) === ownerNumber + "@s.whatsapp.net";

    const groupId = isGroup ? remoteJid : "";

    // wrapper untuk mengirim pesan
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
