const { GuildID } = require('../../../config.json');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');
const chalk = require('chalk');

module.exports = async (client) => {

  try {

    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(client, GuildID);

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;
      const existingCommand = await applicationCommands.cache.find((cmd) => cmd.name === name);

      if (existingCommand) {
        if (localCommand.deleted) {

          await applicationCommands.delete(existingCommand.id);
          console.log(`🟥 Deleted: "${name}"`);
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, { description, options });
          console.log(`🟨 Edited: "${name}"`);
        }

      } else {
        if (localCommand.deleted) {
          console.log(`🟪 Skipped: "${name}"`);
          continue;
        }
        await applicationCommands.create({ name, description, options, });
        console.log(`🟩 Registered: "${name}"`);
      }
    }
  } catch (error) {
    console.log(chalk.red(`Command Registry:\n\n`));
    console.error(chalk.red(error));
  }
};
