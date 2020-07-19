const embedCreator = require("../functions/embedCreator");
require('dotenv/config');
module.exports = {
    name: "ping",
    permission: "NONE",
    minimum: 0,
    description: "Checa o ping atual do bot.",
    example:`${process.env.CLIENT_PREFIX}ping`,
    execute(message,args,client) {
        async function ping() {
            const pingCalculator = await message.channel.send("Calculando ping...");
            pingCalculator.edit(`Sucesso! O ping é ${pingCalculator.createdTimestamp - message.createdTimestamp}ms.`)
        }

        ping()
    }
}