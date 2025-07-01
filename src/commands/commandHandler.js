import { handleSetTimer } from "./setTimer.js";
import { handleStopTimer } from "./stopTimer.js";
import { handleStatus } from "./status.js";
import { handleHelp } from "./help.js";

const commands = {
  setTimer: handleSetTimer,
  stopTimer: handleStopTimer,
  status: handleStatus,
  help: handleHelp,
  // Add more commands here as needed
};

export async function handleCommand(message) {
  const args = message.content.split(" ");
  const commandName = args[0].slice(1); // Remove the '!' prefix
  const commandArgs = args.slice(1);

  const command = commands[commandName];
  if (command) {
    return await command(message, commandArgs);
  }

  return message.reply(
    `❌ Unknown command: ${commandName}. Use \`!help\` for available commands.`
  );
}
