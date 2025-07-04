import { TimerService } from "../services/timerService.js";

export async function handleStopTimer(message, args) {
  const channelId = message.channel.id;

  const activeTimer = TimerService.getActiveTimer(channelId);

  if (!activeTimer) {
    return message.reply("❌ No active timer found in this channel.");
  }

  const stopped = TimerService.stopTimers(channelId);

  if (stopped) {
    const timeRemaining = Math.ceil(
      (activeTimer.prepTime - new Date()) / (1000 * 60)
    );

    const bossName = activeTimer.bossName || "Unknown Boss";

    return message.reply(
      `⏹️ Timer stopped for **${bossName}**! The boss alert was scheduled for ${activeTimer.prepTime.toLocaleTimeString(
        "en-US",
        {
          timeZone: "Asia/Manila",
        }
      )} (${timeRemaining} minutes remaining).`
    );
  } else {
    return message.reply("❌ Failed to stop timer. Please try again.");
  }
}
