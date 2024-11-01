import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import system from "./system";
import fs from "node:fs";
import { updateHistory } from "./history";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

export default async function generateResponse(prompt: string, sender: string) {
  // Load history
  const history = fs.existsSync("history.json")
    ? fs.readFileSync("history.json", "utf-8")
    : "";

  // initialize model
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
    systemInstruction: system,
  });

  // generation config
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 1024, // max length of the response (max value: 8096). 100 tokens is equal to about 60-80 English words.
    responseMimeType: "text/plain",
  };

  // add sender to prompt so model knows who it's talking to
  const modifiedPrompt = `[from ${sender}]\n${prompt}`;

  // save user input to history
  updateHistory("user", modifiedPrompt);

  // start chat session
  const chat = model.startChat({
    generationConfig,
    history: history ? JSON.parse(history) : [],
  });

  // generate response
  const response = await chat.sendMessage(modifiedPrompt);
  const responseText = response.response.text().trim();

  // save model output to history
  updateHistory("model", responseText);

  // return response
  return responseText;
}
