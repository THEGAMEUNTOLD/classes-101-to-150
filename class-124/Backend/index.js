import "dotenv/config";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { ChatMistralAI } from "@langchain/mistralai";
import { sendMail } from "./Mail.Service.js";
import { searchWeb } from "./Search.Service.js";

const rl = readline.createInterface({ input, output });

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY
});

console.log("Type 'exit' to quit.\n");

// 🔹 Parse email command
function parseEmailCommand(text) {
  const regex = /send an email to ([\w.@-]+) with subject (.+?) and body (.+)/i;
  const match = text.match(regex);

  if (!match) return null;

  return {
    to: match[1],
    subject: match[2],
    body: match[3]
  };
}

// 🔹 Parse search command
function parseSearchCommand(text) {
  const regex = /search (.+)/i;
  const match = text.match(regex);

  if (!match) return null;

  return match[1];
}

while (true) {

  const userInput = await rl.question("You: ");

  if (userInput.toLowerCase() === "exit") break;

  try {

    // 🔹 1️ Check if user wants to search
    const searchQuery = parseSearchCommand(userInput);

    if (searchQuery) {

      const results = await searchWeb(searchQuery);

      console.log("\n Search Results:\n");

      results.forEach((r, i) => {
        console.log(`${i + 1}. ${r.title}`);
        console.log(r.url);
        console.log(r.content);
        console.log("-----------------------");
      });

      continue;
    }

    // 🔹 2️ Check if user wants to send email
    const emailData = parseEmailCommand(userInput);

    if (emailData) {

      const result = await sendMail(emailData);
      console.log(" Email Result:", result);

      continue;
    }

    // 🔹 3️ Otherwise normal AI chat
    const response = await model.invoke(userInput);

    console.log("MistralAI:", response.content);

  } catch (err) {

    console.error(" Error:", err.message);

  }

}

rl.close();