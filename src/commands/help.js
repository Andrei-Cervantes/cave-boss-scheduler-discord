export async function handleHelp(message, args) {
  const helpEmbed = {
    color: 0x0099ff,
    title: "🤖 Cave Boss Scheduler Commands",
    description: "Manage boss spawn timers for your guild",
    fields: [
      {
        name: "!setTimer <time> <boss_name>",
        value:
          "Set a boss spawn timer\nExample: `!setTimer 1h30m Cave Boss`, `!setTimer 90m Dragon`\nMinimum time: 6 minutes",
        inline: false,
      },
      {
        name: "!stopTimer",
        value: "Stop the active timer in this channel",
        inline: false,
      },
      {
        name: "!status",
        value: "Check the current timer status and remaining time",
        inline: false,
      },
      {
        name: "!help",
        value: "Show this help message",
        inline: false,
      },
    ],
    footer: {
      text: "Cave Boss Scheduler Bot",
    },
    timestamp: new Date(),
  };

  return message.reply({ embeds: [helpEmbed] });
}
