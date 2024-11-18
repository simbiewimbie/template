const fs = require('fs');
const util = require('util');

const logFile = fs.createWriteStream('console.log', { flags: 'a' });
const logFile2 = fs.createWriteStream('exceptions.log', { flags: 'a' });

return;

const logStdout = process.stdout;

console.log = function (message) {
    const logMessage = util.format(message) + '\n';
    logFile.write(logMessage);
    logStdout.write(logMessage);
};

console.error = function (message) {
    const logMessage = util.format(message) + '\n';
    logFile.write(logMessage);
    logStdout.write(logMessage);
};

process.on('uncaughtException', function (err) {
    const logMessage = util.format(err) + '\n';
    logFile2.write(logMessage);
    logStdout.write(logMessage);
    process.exit(1);
});

process.on('unhandledRejection', function (reason, promise) {
    const logMessage = `Unhandled Rejection at: ${promise} reason: ${reason}\n`;
    logFile2.write(logMessage);
    logStdout.write(logMessage);
});
