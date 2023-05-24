const PREFIX = "?";
const MOD_ROLENAME = "Qmod";
const send = require('send');
const { Task, interval_task } = require('./tasks');

async function process_command(message) {

  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  console.log("Received Msg")

  const args = message.content.slice(PREFIX.length).split(/ +/);
  console.log(args)

  if (args[0] == 'ping') {
    msg = await message.channel.send("pong");
    msg.react("🤔")
  }

  if (args[0] == "mod" && args.length == 1){
    if(message.member.roles.cache.some(r => r.name == MOD_ROLENAME)){
      msg = message.channel.send("You are a moderator");
    } else{
      msg = message.channel.send("You are not in the sudoers file");
    }
  }

  if (args[0] == "man" && args.length == 1){
    const fs = require('fs');
    let rawdata = fs.readFileSync('manual.json')
    let manual = JSON.parse(rawdata);
    let embed_description = "";
    for (manual_entry in manual){
      console.log(`${manual_entry} : ${manual[manual_entry].usage}`);
      embed_description += `\`${manual_entry}\` : ${manual[manual_entry].usage}\n`;
    };

    const embed_msg = {
      color : 0x0b8edf,
      title : "Instructions",
      description : embed_description
    };

    message.author.send({embeds: [embed_msg]});
    
  }

  if (args[0] == "countdown" && +args[1] && args[2] != null){


    const msg = await message.channel.send(`Reminding in ${args[1]} seconds`);

    countdownTask = new Task();
    countdownTask.channel = message.channel;
    countdownTask.author = message.author;
    countdownTask.expiry_time = new Date().getTime() + 86400;
    countdownTask.data = { original_msg : msg , deadline: new Date().getTime() + 1000 * Number(args[1]), reminder : args.splice(2).join(" ")};
    countdownTask.mainfunc = async function(){
        // console.log("Running");
        // this.data.original_msg.edit(`Reminding in ${Math.round((this.data.deadline - new Date().getTime())/1000)} seconds`);
        if( new Date().getTime() >= this.data.deadline ){

            const embed_msg = {
                color : 0x0b8edf,
                title : "Countdown Reminder",
                description : this.data.reminder
            };

            this.channel.send({embeds: [embed_msg]});
            this.enabled = false;
            this.expiry_time = new Date().getTime();

        }
    };

    global.currentTasks.push(countdownTask);



  }

  if (args[0] == "tasks"){
    console.log(global.currentTasks);
  }

}

module.exports = {process_command};