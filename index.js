// Requirements and Variables
import {process_command} from "./cmd.js";
require('dotenv').config();
const keepAlive = require(`./server`);
const { Client } = require('discord.js');
const client = new Client({ intents: 32767 });


// Array of Command objects
client.on('messageCreate', process_command);

// Ready Event
client.on('ready', async () => {
    console.log(`Testing bot is now online successfully!`);
    await client.guilds.cache
            .get(process.env['serverId'])
            .commands.set(cmds);
});

// Bot Login
client.login(process.env['token']);
keepAlive();