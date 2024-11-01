import "dotenv/config";
import useMySQLAuthState from "mysql-baileys";

/**
 * Authenticates a session using MySQL authentication state.
 *
 * @param sessionName - The name of the session to authenticate.
 * @returns An object containing the state, saveCreds, and removeCreds functions.
 *
 * @remarks
 * This function uses environment variables for database credentials:
 * - `DB_PASS`: The password for the database.
 * - `DB_NAME`: The name of the database.
 * - `DB_HOST`: The host of the database (defaults to "127.0.0.1" if not provided).
 * - `DB_USER`: The user for the database.
 *
 * @example
 * ```typescript
 * const { state, saveCreds, removeCreds } = await auth("mySession");
 * ```
 */
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
