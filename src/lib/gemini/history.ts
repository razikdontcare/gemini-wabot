import fs from "node:fs";

/**
 * Updates the history by appending a new message with the specified role.
 *
 * This function reads the existing history from a `history.json` file, appends
 * a new message to it, and then writes the updated history back to the file.
 * If the `history.json` file does not exist or is empty, it initializes the
 * history as an empty array.
 *
 * @param role - The role of the message sender, either "user" or "model".
 * @param message - The message content to be added to the history.
 */
export function updateHistory(role: "user" | "model", message: string) {
  // Load history and check if it exists
  const history = fs.existsSync("history.json")
    ? fs.readFileSync("history.json", "utf-8")
    : "";

  // If history.json is empty, set it to an empty array
  const data = history ? JSON.parse(history) : [];

  const content = {
    role,
    parts: [{ text: message }],
  };

  data.push(content);

  // Write the updated history back to the file
  fs.writeFileSync("history.json", JSON.stringify(data, null, 2)); // add indentation to make it readable
}
