const chalk = require('chalk');

module.exports = (client) => {
  const date = new Date();
  const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  console.log(chalk.grey(`[${time}] [CLIENT] [${client.user.username}] started.`));
}
