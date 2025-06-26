import { CronJob } from "cron";
import { CONFIG } from "../config/config.js";

export class TimerService {
  scheduleBossAlerts(channel, totalMinutes) {
    // Alert prep time
    const alertPreparationInMs =
      (totalMinutes - CONFIG.PREP_ALERT_TIME) * 60 * 1000;
    const alertPreparationTime = new Date(Date.now() + alertPreparationInMs);

    // Alert spawn time
    const alertSpawnInMs = (totalMinutes - CONFIG.SPAWN_ALERT_TIME) * 60 * 1000;
    const alertSpawnTime = new Date(Date.now() + alertSpawnInMs);

    // Schedule preparation alert
    this.scheduleAlert(
      alertPreparationTime,
      CONFIG.PREP_MESSAGE,
      channel,
      CONFIG.TIMEZONE
    );

    // Schedule spawn alert
    this.scheduleAlert(
      alertSpawnTime,
      CONFIG.SPAWN_MESSAGE,
      channel,
      CONFIG.TIMEZONE
    );
  }

  scheduleAlert(alertTime, message, channel, timezone) {
    new CronJob(
      alertTime,
      () => {
        channel.send(message);
      },
      null,
      true,
      timezone
    );
  }
}
