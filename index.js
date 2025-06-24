require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { CronJob } = require("cron");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TIMEZONE = "America/New_York";

// Parses strings like "1h30m", "90m", etc.
function parseDuration(str) {
  const regex = /(?:(\d+)h)?(?:(\d+)m)?/i;
  const match = regex.exec(str);
  if (!match) throw new Error("Invalid time format");

  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;

  return hours * 60 + minutes;
}

client.once("ready", () => {
  console.log(`${client.user.tag} is online!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.content.startsWith("!setbossin")) return;

  try {
    const args = message.content.split(" ").slice(1);
    if (args.length === 0) {
      return message.reply(
        "⏰ Usage: `!setbossin 1h30m`, `!setbossin 90m`, etc."
      );
    }

    const totalMinutes = parseDuration(args[0]);

    if (totalMinutes <= 5) {
      return message.reply("❌ Time must be greater than 5 minutes.");
    }

    const alertInMs = (totalMinutes - 5) * 60 * 1000;
    const alertTime = new Date(Date.now() + alertInMs);

    new CronJob(
      alertTime,
      () => {
        message.channel.send(
          "@here 🚨 Boss is spawning in 5 minutes! Get ready!"
        );
      },
      null,
      true,
      TIMEZONE
    );

    message.reply(
      `✅ Alert set for ${alertTime.toLocaleTimeString("en-US", {
        timeZone: TIMEZONE,
      })} (5 minutes before spawn).`
    );
  } catch (err) {
    message.reply("❌ Error: " + err.message);
  }
});

client.login(process.env.DISCORD_TOKEN);
