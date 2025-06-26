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

client.once("ready", () => {
  console.log(`${client.user.tag} is online!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.content.startsWith("!")) return;

  await handleCommand(message);
});

client.login(process.env.DISCORD_TOKEN);
