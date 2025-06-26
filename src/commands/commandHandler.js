import { handleSetTimer } from "./setTimer.js";

const commands = {
  setTimer: handleSetTimer,
  // Add more commands here as needed
};

export function handleCommand(message) {
  const args = message.content.split(" ");
  const commandName = args[0].slice(1); // Remove the '!' prefix
  const commandArgs = args.slice(1);

  const command = commands[commandName];
  if (command) {
    return command(message, commandArgs);
  }

  return message.reply(`❌ Unknown command: ${commandName}`);
}
