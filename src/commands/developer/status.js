const { Discord, EmbedBuilder } = require("discord.js");
const { GuildID } = require('../../../config.json');
const { heapUsed } = process.memoryUsage();
var osutils = require('os-utils');
require('dotenv').config();

module.exports = {

    deleted: false,
    testOnly: false,
    devOnly: true,

    name: 'status',
    description: 'bot status',
    options: [],

    callback: async (client, interaction) => {

        if (interaction.commandName !== 'status') return;

        const guild = client.guilds.cache.get(GuildID);
        const self = guild.members.cache.get(process.env.SELF);
        const user = await client.users.fetch(self.id);
        const bannerURL = user.bannerURL({ dynamic: true, size: 512 });
        const avatarURL = user.displayAvatarURL({ dynamic: true, size: 512 });

        osutils.cpuUsage(async function (v) {
            const uptimeInSeconds = process.uptime();
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const startTimeEpoch = currentTimestamp - Math.floor(uptimeInSeconds);

            var fields = [
                {
                    name: ' ',
                    value: `
            <:github:1227984765798449192> [GitHub Repository](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYThrdGV2MGJ2OTN6eG9pNjRldjIyNmpoam9vcmJzczR1aWM2aHJ5ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif)
            <:nodejs:1227959385846972477> version: ${process.version}
            <:2057javascriptlogo:1231669662664622160>  version: ${Discord.version}
            `,
                    inline: true,
                },
                {
                    name: ' ',
                    value:
                        `\`Ping:\`${client.ws.ping} m\n` +
                        `\`Threads:\` ${osutils.cpuCount()} Cores\n` +
                        `\`CPU Usage:\` ${v.toFixed(3)}%\n` +
                        `\`MEM Usage:\` ${(heapUsed / 1024 / 1024).toFixed(2)} MB\n` +
                        `\`Bot Uptime:\` <t:${startTimeEpoch}:R>`
                },
            ];

            const embed = new EmbedBuilder()
                .setAuthor({ name: 'ガイド₊', iconURL: avatarURL })
                .addFields(fields)
                .setColor('#FFFFFF')
                .setThumbnail(bannerURL);
        });
    }
}
