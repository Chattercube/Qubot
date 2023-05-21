const PREFIX = "?"

export async function process_command(message){

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