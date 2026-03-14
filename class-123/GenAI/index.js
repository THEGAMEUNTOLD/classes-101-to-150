import "dotenv/config";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { ChatMistralAI } from "@langchain/mistralai";
import { sendMail } from "./Mail.Service.js";

const rl = readline.createInterface({ input, output });

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY
});

console.log("Type 'exit' to quit.\n");

// 🔹 Parse email command from USER input
function parseEmailCommand(text) {
  const regex =
    /send an email to ([\w.@-]+) with subject (.+?) and body (.+)/i;

  const match = text.match(regex);

  if (!match) return null;

  return {
    to: match[1],
    subject: match[2],
    body: match[3]
  };
}

while (true) {
  const userInput = await rl.question("You: ");

  if (userInput.toLowerCase() === "exit") break;

  try {
    // AI response generate
    const response = await model.generate([
      [
        {
          role: "user",
          content: userInput
        }
      ]
    ]);

    const aiText = response.generations[0][0].text;

    console.log("MistralAI:", aiText);

    // ✅ IMPORTANT: parse USER INPUT not AI response
    const emailData = parseEmailCommand(userInput);

    if (emailData) {
      try {
        const result = await sendMail(emailData);
        console.log("📧 Email Result:", result);
      } catch (err) {
        console.error("❌ Email Error:", err.message);
      }
    }

  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

rl.close();