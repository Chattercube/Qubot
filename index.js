





// Requirements and Variables



const process_command = require('./cmd');
require('dotenv').config();
const keepAlive = require(`./server`);
const { Client } = require('discord.js');
const client = new Client({ intents: 3276799 });
// Array of Command objects
client.on('messageCreate', process_command);

client.on('error', (err) => {
  console.log(err.message)
});

// Ready Event
client.on('ready', async () => {
  console.log(`Testing bot is now online successfully!`);
  await client.guilds.cache.get(process.env['serverId'])
});

// Bot Login
client.login(process.env['token']);
keepAlive();
