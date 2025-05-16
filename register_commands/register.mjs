import axios from 'axios';
import dotenv from 'dotenv';
import { commands } from './commands.js';
dotenv.config();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

// const commands = [
//   {
//     name: 'foo',
//     description: 'Replies with bar',
//     type: 1,
//   },
// ];

console.log('Registering commands:', JSON.stringify(commands, null, 2));

axios
  .put(
    `https://discord.com/api/v10/applications/${CLIENT_ID}/guilds/${GUILD_ID}/commands`,
    commands,
    {
      headers: {
        Authorization: `Bot ${DISCORD_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  )
  .then((response) => {
    console.log('✅ Commands registered successfully:', response.data);
  })
  .catch((error) => {
    console.error('❌ Error registering slash commands:', error.response?.data || error.message);
  });
