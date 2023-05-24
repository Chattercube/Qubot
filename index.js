


// Requirements and Variables
const {process_command} = require('./cmd');
require('dotenv').config();
const keepAlive = require(`./server`);
const { Client } = require('discord.js');
const client = new Client({ intents: 3276799 });

const {Task} = require('./tasks');
global.currentTasks = new Array();

function interval_task(){
    for (taskkey in global.currentTasks){
        // console.log(taskkey);
        var task = global.currentTasks[taskkey];
        if(task.enabled){
            task.mainfunc();
        }
        if( task.expiry_time != null && task.expiry_time <= new Date().getTime()){
            task.removed = true;
        }
    }

    global.currentTasks = global.currentTasks.filter(task => !task.removed);

    
}

// Array of Command object
client.on('messageCreate', process_command);

client.on('error', (err) => {
  console.log(err.message)
});

// Ready Event
client.on('ready', async () => {
  console.log(`Testing bot is now online successfully!`);
  await client.guilds.cache.get(process.env['serverId']);
  await client.guilds.cache.get(process.env['serverId2']);
  setInterval(interval_task, 100);
});



// Bot Login
client.login(process.env['token']);
keepAlive();
