# Cave Boss Scheduler Discord Bot

A Discord bot for scheduling cave boss spawn alerts with automatic preparation and spawn notifications.

## 🎯 Features

- ⏰ **Flexible Timer Formats** - Support for hours and minutes (e.g., `1h30m`, `90m`)
- **Automatic Alerts** - Preparation alert 5 minutes before spawn, spawn alert 1 minute before
- **Timezone Support** - Configured for Asia/Manila timezone (easily customizable)
- 📢 **Mention Notifications** - Uses `@here` to notify all online members
- 🛡️ **Error Handling** - Robust error handling with user-friendly messages
- ⚡ **Real-time Scheduling** - Uses cron jobs for precise timing

## 📋 Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn
- Discord Bot Token
- Discord.js v14.20.0+

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/cave-boss-scheduler-discord.git
   cd cave-boss-scheduler-discord
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   DISCORD_TOKEN=your_discord_bot_token_here
   TIMEZONE=your_timezone_here
   PREP_MESSAGE=your_prep_message_here
   SPAWN_MESSAGE=your_spawn_message_here
   ```

4. **Run the bot**
   ```bash
   npm start
   ```

## 📖 Usage

### Commands

| Command            | Description            | Example           |
| ------------------ | ---------------------- | ----------------- |
| `!setTimer <time>` | Set a boss spawn timer | `!setTimer 1h30m` |

### Time Format Examples

- `!setTimer 1h30m` - 1 hour 30 minutes
- `!setTimer 90m` - 90 minutes
- `!setTimer 2h` - 2 hours
- `!setTimer 45m` - 45 minutes

### Alert System

The bot automatically sends two alerts:

1. **Preparation Alert** (5 minutes before spawn)

   - Message: "🚨 Boss is spawning in 5 minutes! Get ready! @here"
   - Helps players prepare and regroup

2. **Spawn Alert** (1 minute before spawn)
   - Message: "🚨 Boss is spawning in 1 minute! Enter cave now! @here"
   - Final warning to enter the cave

## ⚙️ Configuration

### Timezone

Default timezone is set to `Asia/Manila`. To change it, modify the `TIMEZONE` constant in `constants.js`:

```javascript
export const TIMEZONE = "America/New_York"; // Example
```

### Alert Messages

Customize alert messages in `constants.js`:

```javascript
export const PREP_MESSAGE =
  "🚨 Boss is spawning in 5 minutes! Get ready! @here";
export const SPAWN_MESSAGE =
  "🚨 Boss is spawning in 1 minute! Enter cave now! @here";
```

### Minimum Timer

The bot requires a minimum of 5 minutes to allow for preparation time. This can be modified in the validation logic.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## �� Acknowledgments

- Built with [Discord.js](https://discord.js.org/)
- Job scheduling powered by [node-cron](https://github.com/node-cron/node-cron)
