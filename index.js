require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

// Utils
import { parseDuration, alertMessage } from "./utils.js";

// Constants
import { TIMEZONE, PREP_MESSAGE, SPAWN_MESSAGE } from "./constants.js";

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
  if (message.author.bot || !message.content.startsWith("!setTimer")) return;

  try {
    const args = message.content.split(" ").slice(1);
    if (args.length === 0) {
      return message.reply(
        "⏰ Usage: `!setTimer 1h30m`, `!setTimer 90m`, etc."
      );
    }

    const totalMinutes = parseDuration(args[0]);

    if (totalMinutes <= 5) {
      return message.reply(
        "❌ Time must be greater than 5 minutes to allow for preparation/regrouping."
      );
    }

    // Alert prep time
    const alertPreparationInMs = (totalMinutes - 5) * 60 * 1000;
    const alertPreparationTime = new Date(Date.now() + alertPreparationInMs);

    // Alert spawn time
    const alertSpawnInMs = (totalMinutes - 1) * 60 * 1000;
    const alertSpawnTime = new Date(Date.now() + alertSpawnInMs);

    // Alert preparation
    alertMessage(alertPreparationTime, PREP_MESSAGE, TIMEZONE);

    // Alert spawn
    alertMessage(alertSpawnTime, SPAWN_MESSAGE, TIMEZONE);

    message.reply(
      `✅ Alert set for ${alertPreparationTime.toLocaleTimeString("en-US", {
        timeZone: TIMEZONE,
      })} (5 minutes before spawn).`
    );
  } catch (err) {
    message.reply("❌ Error: " + err.message);
  }
});

client.login(process.env.DISCORD_TOKEN);
