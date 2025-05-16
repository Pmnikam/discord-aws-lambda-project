// register_commands/commands.js
import { SlashCommandBuilder } from '@discordjs/builders';

const commands = [
  new SlashCommandBuilder()
    .setName('foo')
    .setDescription('Replies with bar')
    .toJSON()
];

export { commands };
