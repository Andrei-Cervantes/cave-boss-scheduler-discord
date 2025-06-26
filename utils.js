const { CronJob } = require("cron");

// Parses strings like "1h30m", "90m", etc.
export function parseDuration(str) {
  const regex = /(?:(\d+)h)?(?:(\d+)m)?/i;
  const match = regex.exec(str);
  if (!match) throw new Error("Invalid time format");

  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;

  return hours * 60 + minutes;
}

// Alert message
export function alertMessage(alertTime, message, timezone) {
  new CronJob(
    alertTime,
    () => {
      message.channel.send(message);
    },
    null,
    true,
    timezone
  );
}
