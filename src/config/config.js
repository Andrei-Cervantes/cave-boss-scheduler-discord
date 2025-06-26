export const CONFIG = {
  TIMEZONE: process.env.TIMEZONE || "Asia/Manila",
  PREP_MESSAGE:
    process.env.PREP_MESSAGE ||
    "🚨 Boss is spawning in 5 minutes! Get ready! @here",
  SPAWN_MESSAGE:
    process.env.SPAWN_MESSAGE ||
    "🚨 Boss is spawning in 1 minute! Enter cave now! @here",
  PREP_ALERT_TIME: process.env.PREP_ALERT_TIME || 5, // in minutes
  SPAWN_ALERT_TIME: process.env.SPAWN_ALERT_TIME || 1, // in minutes
};
