const discord = require("discord.js")
const { minimum, permission } = require("./ban")
require('dotenv/config');
module.exports = {
    name:"mute",
    minimum: 3,
    description: "Comando para silenciar pessoas chatas (vulgo struater).",
    example: `${process.env.CLIENT_PREFIX}mute (@usuário)`,
    permission: "MANAGE_MESSAGES",
    execute(message,args,client) {
      var getUser = client.functions.get("getUser").execute(message,args,client)
    }
}