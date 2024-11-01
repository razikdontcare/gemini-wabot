import "dotenv/config";
import makeWASocket, {
  DisconnectReason,
  Browsers,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  makeCacheableSignalKeyStore,
} from "baileys";
import { Boom } from "@hapi/boom";
import auth from "./db";
import messageHandler from "./handler";
import MAIN_LOGGER from "baileys/lib/Utils/logger";

const logger = MAIN_LOGGER.child({});
logger.level = process.env.LOG_LEVEL || "info";

const store = makeInMemoryStore({ logger });

async function init(sessionName: string = "default") {
  console.log("[%s] Initializing session", sessionName);

  const { error, version } = await fetchLatestBaileysVersion();

  if (error) {
    console.error("[%s] No connection, check your internet.", sessionName);
    return init(sessionName);
  }

  const { state, saveCreds, removeCreds } = await auth(sessionName);

  const socket = makeWASocket({
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    printQRInTerminal: true,
    browser: Browsers.macOS("Desktop"),
    defaultQueryTimeoutMs: undefined,
    syncFullHistory: false,
    version,
    logger,
    getMessage: async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid!, key.id!);
        return msg?.message || undefined;
      }

      return {
        conversation: undefined,
      };
    },
  });

  store.bind(socket.ev);

  socket.ev.on("creds.update", saveCreds);

  socket.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect =
        (lastDisconnect?.error as Boom)?.output?.statusCode !==
        DisconnectReason.loggedOut;
      if (shouldReconnect) {
        console.log("[%s] Connection closed. Reconnecting...", sessionName);
        init(sessionName); // Reconnect jika tidak logged out
      } else {
        console.log("[%s] Connection closed. Logged out.", sessionName);
        removeCreds(); // Hapus creds dari database jika logged out
      }
    } else if (connection === "open") {
      console.log("[%s] Connected to WhatsApp.", sessionName);
    }
  });

  socket.ev.on("messages.upsert", async (messageUpdate) => {
    // console.log("[%s] New message", sessionName);
    await messageHandler({ socket, m: messageUpdate, sessionName });
  });

  return socket;
}

init(process.env.SESSION_NAME);
