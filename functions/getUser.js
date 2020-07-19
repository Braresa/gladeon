const discord = require("discord.js")
const { execute } = require("../commands/ban")

module.exports = {
    name:"getUser",

    execute(message,args,client) {
        if(message.mentions.members.first()!==undefined) {
            return message.mentions.members.first();
        } else if(message.mentions.members.first()===undefined) {
            async function getUserByID() {
                var user = await client.users.fetch(args[0]).catch(err => {return false})
                if(user===false) {
                    return false;
                } else {
                    return user;
                }
            }
        }
    }
}