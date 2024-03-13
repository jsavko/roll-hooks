 Hooks.on('preCreateChatMessage', (chatMessage, user, data, id) => { 
    if (data.rollMode == "roll") {
      chatMessage.flags.dicehooks = {targets: Array.from(game.user.targets).map(i=>i.document.uuid), isRoll: true}
      chatMessage.updateSource({ flags: chatMessage.flags})
    }
 });

 Hooks.on('createChatMessage', (chatMessage, data) => { 
   if (chatMessage.flags.dicehooks) {
      chatMessage.flags.dicehooks.firstRender = true;
      chatMessage.updateSource({ flags: chatMessage.flags})
      Hooks.callAll('createRollResult', buildDiceHookData(chatMessage));
   }
 });

// Only call render if it's the first time and contains all flag data
Hooks.on('renderChatMessage', (chatMessage, html, data) => {
   if (chatMessage.flags.dicehooks) {
      let rollResult = buildDiceHookData(chatMessage);
      if (chatMessage.flags.dicehooks.firstRender) {
         // if DiceSoNice is installed wait for chatcard to render 
         if (game.dice3d && !game.settings.get("dice-so-nice", "immediatelyDisplayChatMessages")) {
            // Try to delay to let dice so nice render the chat card first.
            Hooks.once('diceSoNiceRollComplete', () => {
               Hooks.callAll('renderRollResult', rollResult);
            });
         } else  {
            Hooks.callAll('renderRollResult', rollResult);
         }
      } 
   }
});


function buildDiceHookData(chatMessage) {
   let rollResults = {}
   rollResults.rolls = chatMessage.rolls
   rollResults.speaker = chatMessage.speaker;
   rollResults.messageId = chatMessage._id;
   rollResults.firstRollResult = chatMessage.rolls[0]._total
   return rollResults;
}

