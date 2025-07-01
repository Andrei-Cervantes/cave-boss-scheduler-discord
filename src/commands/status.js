import { TimerService } from "../services/timerService.js";

export async function handleStatus(message, args) {
  const channelId = message.channel.id;

  const activeTimer = TimerService.getActiveTimer(channelId);

  if (!activeTimer) {
    return message.reply("📊 No active timer in this channel.");
  }

  const now = new Date();
  const prepTimeRemaining = Math.ceil(
    (activeTimer.prepTime - now) / (1000 * 60)
  );
  const spawnTimeRemaining = Math.ceil(
    (activeTimer.spawnTime - now) / (1000 * 60)
  );

  const statusEmbed = {
    color: 0x00ff00,
    title: "⏰ Active Boss Timer",
    fields: [
      {
        name: "Total Duration",
        value: `${activeTimer.totalMinutes} minutes`,
        inline: true,
      },
      {
        name: "Prep Alert",
        value: `${activeTimer.prepTime.toLocaleTimeString("en-US", {
          timeZone: "Asia/Manila",
        })} (${prepTimeRemaining}m remaining)`,
        inline: true,
      },
      {
        name: "Spawn Alert",
        value: `${activeTimer.spawnTime.toLocaleTimeString("en-US", {
          timeZone: "Asia/Manila",
        })} (${spawnTimeRemaining}m remaining)`,
        inline: true,
      },
    ],
    timestamp: new Date(),
  };

  return message.reply({ embeds: [statusEmbed] });
}
