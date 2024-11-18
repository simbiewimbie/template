const { Client, IntentsBitField, REST, Routes } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
const { GuildID, clientID } = require('../config.json')
require('dotenv').config();
require('./logger');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions
    ]
});

eventHandler(client);
module.exports = { client }
client.login(process.env.TOKEN);



































// const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// function clearGuildCommands(guildID, clientID) {
//   if (!guildID) throw new Error('You must provide a guild id.');
//   rest
//     .put(Routes.applicationGuildCommands(clientID, guildID), { body: [] })
//     .then(() => console.log(`Commands cleared for guild "${guildID}".`))
//     .catch(console.error); 
// }

// clearGuildCommands(GuildID, clientID);

