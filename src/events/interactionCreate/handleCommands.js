const { EmbedBuilder } = require('discord.js');
const { devs, GuildID } = require('../../../config.json');
require('dotenv').config();
const getLocalCommands = require('../../utils/getLocalCommands');
const chalk = require('chalk');

module.exports = async (client, interaction) => {

  if (!interaction.isChatInputCommand()) return;
  const localCommands = getLocalCommands();

  try {

    const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);

    if (!commandObject) return;
    if (commandObject.devOnly) {

      if (!devs.includes(interaction.member.id)) {

        const embed = new EmbedBuilder()
          .setColor("#FFFFFF")
          .setDescription("Developer Command.")
        return await interaction.reply({ embeds: [embed], content: `<@${interaction.member.id}>` });
      }
    }

    if (commandObject.testOnly) {
      if (!(interaction.guild.id === testServer)) {

        const embed = new EmbedBuilder()
          .setColor("#FFFFFF")
          .setDescription("Test Command.")
        return await interaction.reply({ embeds: [embed], content: `<@${interaction.member.id}>` });
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;

        const embed = new EmbedBuilder()
          .setColor("#FFFFFF")
          .setDescription("Missing Permissions.")
        return await interaction.reply({ embeds: [embed], content: `<@${interaction.member.id}>` });
      }
    }

    await commandObject.callback(client, interaction);

  } catch (error) {
    console.log(chalk.red(`Command Handler:\n\n`));
    console.error(chalk.red(error));
  }
};
