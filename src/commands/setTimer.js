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

    const timerInfo = await TimerService.scheduleBossAlerts(
      message.channel,
      totalMinutes
    );

    return message.reply(
      `✅ Timer set for ${totalMinutes} minutes!\n` +
        `⏰ Prep alert: ${timerInfo.prepTime.toLocaleTimeString("en-US", {
          timeZone: CONFIG.TIMEZONE,
        })} (${CONFIG.PREP_ALERT_TIME}m before spawn)\n` +
        `🚨 Spawn alert: ${timerInfo.spawnTime.toLocaleTimeString("en-US", {
          timeZone: CONFIG.TIMEZONE,
        })} (${CONFIG.SPAWN_ALERT_TIME}m before spawn)\n` +
        `Use \`!status\` to check timer or \`!stopTimer\` to cancel.`
    );
  } catch (err) {
    return message.reply("❌ Error: " + err.message);
  }
}
