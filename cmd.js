const PREFIX = "?";
const MOD_ROLENAME = "Qmod";

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
}

module.exports = process_command;