const PREFIX = "?"

async function process_command(message){

    if(!message.content.startsWith(PREFIX) || message.authot.bot ) return;
    const args = message.content.slice(PREFIX.length).split(/ +/);

    const messageArray = message.content.split("");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];

if (command == 'ping'){
    msg = message.channel.send("Bot is working!");
    msg.react('🤔');
}
}



// Requirements and Variables


require('dotenv').config();
const keepAlive = require(`./server`);
const { Client } = require('discord.js');
const client = new Client({ intents: 65535 });


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