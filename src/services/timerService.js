import { CronJob } from "cron";
import { CONFIG } from "../config/config.js";

class TimerService {
  constructor() {
    this.activeTimers = new Map(); // Track active timers by channel ID
  }

  scheduleBossAlerts(channel, totalMinutes) {
    const channelId = channel.id;

    // Cancel any existing timers for this channel
    this.stopTimers(channelId);

    // Alert prep time
    const alertPreparationInMs =
      (totalMinutes - CONFIG.PREP_ALERT_TIME) * 60 * 1000;
    const alertPreparationTime = new Date(Date.now() + alertPreparationInMs);

    // Alert spawn time
    const alertSpawnInMs = (totalMinutes - CONFIG.SPAWN_ALERT_TIME) * 60 * 1000;
    const alertSpawnTime = new Date(Date.now() + alertSpawnInMs);

    // Schedule preparation alert
    const prepJob = this.scheduleAlert(
      alertPreparationTime,
      CONFIG.PREP_MESSAGE,
      channel,
      CONFIG.TIMEZONE
    );

    // Schedule spawn alert
    const spawnJob = this.scheduleAlert(
      alertSpawnTime,
      CONFIG.SPAWN_MESSAGE,
      channel,
      CONFIG.TIMEZONE
    );

    // Store the timers
    this.activeTimers.set(channelId, {
      prepJob,
      spawnJob,
      totalMinutes,
      startTime: new Date(),
      prepTime: alertPreparationTime,
      spawnTime: alertSpawnTime,
    });

    return {
      prepTime: alertPreparationTime,
      spawnTime: alertSpawnTime,
      totalMinutes,
    };
  }

  scheduleAlert(alertTime, message, channel, timezone) {
    return new CronJob(
      alertTime,
      () => {
        channel.send(message);
        // Remove the timer from active timers after it fires
        const channelId = channel.id;
        const timers = this.activeTimers.get(channelId);
        if (timers) {
          this.activeTimers.delete(channelId);
        }
      },
      null,
      true,
      timezone
    );
  }

  stopTimers(channelId) {
    const timers = this.activeTimers.get(channelId);
    if (timers) {
      if (timers.prepJob) {
        timers.prepJob.stop();
      }
      if (timers.spawnJob) {
        timers.spawnJob.stop();
      }
      this.activeTimers.delete(channelId);
      return true;
    }
    return false;
  }

  getActiveTimer(channelId) {
    return this.activeTimers.get(channelId);
  }

  getAllActiveTimers() {
    return this.activeTimers;
  }
}

// Create a singleton instance
const timerServiceInstance = new TimerService();

// Export the singleton instance
export { timerServiceInstance as TimerService };
