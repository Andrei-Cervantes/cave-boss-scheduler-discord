import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import { handleCommand } from "./commands/commandHandler.js";
import "./server.js"; // Start the HTTP server

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// awake every 14 mins
function loopAwake() {
  setInterval(() => {
    console.log("awake");
  }, 840000);
}

client.once("ready", () => {
  console.log(`${client.user.tag} is online!`);
  loopAwake();
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.content.startsWith("!")) return;

  try {
    await handleCommand(message);
  } catch (error) {
    console.error("Error handling command:", error);
    message.reply("❌ An error occurred while processing your command.");
  }
});

client.login(process.env.DISCORD_TOKEN);
