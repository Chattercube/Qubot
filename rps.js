function rps_await_invite(user1, user2){
  const invite_msg = await user2.send("${user1} invites you to play rock-papers-scissors!").react('👍');
  const filter = (reaction, user) => {
	 return reaction.emoji.name === '👍' && user.id === user2;
  };
  const collector = invite_msg.awaitReactions(filter, {max: 1, time: 60});
  return collector;
}

function rps_play(user1, user2){
  
  const filter = (reaction, user) => {
	 return ['✊', '🤚', '✌'].includes(reaction.emoji) && user.id === user2;
  };
  
  const user1_msg = await user1.send("Choose your moves").react('✊').react('🤚').react('✌');
  const user1_await = user1_msg.awaitReactions(filter, {max: 1, time: 60});

  const user2_msg = await user2.send("Choose your moves").react('✊').react('🤚').react('✌');
  const user2_await = user2_msg.awaitReactions(filter, {max: 1, time: 60});

  Promise.all([user1_await, user2_await]).then( responses => {
    const user1_move = response[0].first();
    const user2_move = response[1].first();

    if user1_move == 

  }
  )
}
