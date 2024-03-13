Creates two new hooks for Rolls.
`createRollResult` which is fired when a roll is created
`renderRollResult` which is fired when the roll chatMessage is rendered. If you are using Dice so nice it will not fire until after the chatMessage is rendered by Dice So Nice

Both hooks return an object
```
{
  "rolls": [{}], //Foundry Roll data
  "speaker": {
    "scene": "cgv9iVmx3dNIL3YA", // id of scene where roll originated
    "actor": null, // id of actor where roll originated
    "token": null, // id of token where roll originated
    "alias": "Gamemaster" // id of name of actor or player where roll originated
  },
  "messageId": "v8o4nshYe8bhpWEB", // id of the chatMessage where the roll originated
  "firstRollResult": 16  // The first result of the rolls array
}
```

Examples

```
Hooks.on('createRollResult', (rollResult) => { 
   console.log(rollResult);
})
```

Popup a warning when a total of 20 is rolled.

```
Hooks.on('renderRollResult', (rollResult) => { 
   if (rollResult.firstRollResult == 20) { 
     ui.notifications.warn('20!!!!!!!!!!')
   }
})
```