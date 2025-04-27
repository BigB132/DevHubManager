function commands() {
    const readline = require('readline');
    const UserData = require("../models/userData");

    // Interface erstellen
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', async (input) => {
      const args = input.trim().split(' ');
      const command = args.shift().toLowerCase();
    
      if (command === '/reset') {
        const subCommand = args[0];
    
        if (subCommand === 'time') {
          console.log('Daily claims reseted');
          await UserData.updateMany({}, { $set: { claimedDaily: 0 } });
        } else {
          console.log('Unknown subcommand at /reset');
        }
      } else {
        console.log('Unknown command:', command);
      }
    });
    
    console.log('Commands ready');
}

module.exports = commands;