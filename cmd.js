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
    const msg = await message.channel.send("pong");
    msg.react("🤔")
  }

  if (args[0] == "mod" && args.length == 1) {
    if (message.member.roles.cache.some(r => r.name == MOD_ROLENAME)) {
      msg = message.channel.send("You are a moderator");
    } else {
      msg = message.channel.send("You are not in the sudoers file");
    }
  }

  if (args[0] == "man" && args.length == 1) {
    const fs = require('fs');
    let rawdata = fs.readFileSync('manual.json')
    let manual = JSON.parse(rawdata);
    let embed_description = "";
    for (manual_entry in manual) {
      console.log(`${manual_entry} : ${manual[manual_entry].usage}`);
      embed_description += `\`${manual_entry}\` : ${manual[manual_entry].usage}\n`;
    };

    const embed_msg = {
      color: 0x0b8edf,
      title: "Instructions",
      description: embed_description
    };

    message.author.send({ embeds: [embed_msg] });

  }

  if (args[0] == "countdown" && +args[1] && args[2] != null) {


    const msg = await message.channel.send(`Reminding <t:${Math.floor((new Date().getTime() + 1000 * Number(args[1])) / 1000)}:R>`);
    setTimeout(() => {

        const embed_msg = {
          color: 0x0b8edf,
          title: "Countdown Reminder",
          description: args.splice(2).join(" ")
        };
    
        msg.channel.send({ embeds: [embed_msg] });
        msg.delete();

      }, Number(args[1] * 1000));
    
  }

  if (args[0] == "tasks") {
    console.log(global.currentTasks);
  }

  if (args[0] == "math") {

    const n1 = Math.floor(Math.random() * 10);
    const n2 = Math.floor(Math.random() * 10);
    const ans = n1 + n2;
    const msg = await message.author.send(`What is ${n1} + ${n2} ?`);

    const collectorFilter = function(response){
      return true;
    };

    const collector = msg.channel.awaitMessages({ filter: collectorFilter, time: 15000, max: 1})
      .then(function(collected){
        // console.log(collected);
        const response = collected.first();
        if(response.content == ans){
          response.channel.send("Correct!");
        } else {
          response.channel.send(`Wrong! The correct answer is ${ans}`);
        }
      }
    )
  }

  if(args[0] == "rps" && message.mentions.users.first().user ){
  }

}

module.exports = { process_command };