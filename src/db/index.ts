import "dotenv/config";
import useMySQLAuthState from "mysql-baileys";

export default async function auth(sessionName: string) {
  const { state, saveCreds, removeCreds } = await useMySQLAuthState({
    session: sessionName, // required
    password: process.env.DB_PASS!, // required
    database: process.env.DB_NAME!, // required
    host: process.env.DB_HOST || "127.0.0.1", // (127.0.0.1 recommended if using local MySQL to avoid connection issues)
    user: process.env.DB_USER,
  });

  return { state, saveCreds, removeCreds };
}
