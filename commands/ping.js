const embedCreator = require("../functions/embedCreator");

module.exports = {
    name: "ping",
    permission: "NONE",
    minimum: 0,
    description: "Check bot ping.",
    execute(message,args,client) {
        async function ping() {
            const pingCalculator = await message.channel.send("Calculando ping...");
            pingCalculator.edit(`Sucesso! O ping é ${pingCalculator.createdTimestamp - message.createdTimestamp}ms.`)
        }

        ping()
    }
}