import fs from "node:fs";

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

  fs.writeFileSync("history.json", JSON.stringify(data, null, 2)); // add indentation to make it readable
}
