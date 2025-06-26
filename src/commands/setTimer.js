import { parseDuration } from "../utils/utils.js";
import { CONFIG } from "../config/config.js";
import { TimerService } from "../services/timerService.js";

export async function handleSetTimer(message, args) {
  if (args.length === 0) {
    return message.reply("⏰ Usage: `!setTimer 1h30m`, `!setTimer 90m`, etc.");
  }

  try {
    const totalMinutes = parseDuration(args[0]);

    if (totalMinutes <= 5) {
      return message.reply(
        "❌ Time must be greater than 5 minutes to allow for preparation/regrouping."
      );
    }

    const timerService = new TimerService();
    await timerService.scheduleBossAlerts(message.channel, totalMinutes);

    const alertExactSpawnTime = new Date(Date.now() + totalMinutes * 60 * 1000);

    return message.reply(
      `✅ Alert set for ${alertExactSpawnTime.toLocaleTimeString("en-US", {
        timeZone: CONFIG.TIMEZONE,
      })}, everybody please prepare!`
    );
  } catch (err) {
    return message.reply("❌ Error: " + err.message);
  }
}
