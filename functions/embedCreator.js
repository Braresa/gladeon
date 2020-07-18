const discord = require("discord.js")

module.exports = {
    name:"embedCreator",
    execute(color,title,thumbnail,fields,author,message,dm,messageReal,channelSend) {
    const embedSend = new discord.MessageEmbed()
	.setColor(color)
    .setThumbnail(thumbnail)
    .setTimestamp()
    .setFooter(author.username)
    .addFields(fields)
    .setAuthor('Gladeon','https://i.imgur.com/vSm6wXn.png')

    if(title!==undefined) {
        embedSend.setAuthor(title,'https://i.imgur.com/vSm6wXn.png')
    }

    if(dm===true && dm !== undefined && messageReal !== undefined) {
    message.send(embedSend)
    .catch(() => messageReal.channel.send("Ops! Aconteceu um erro ao enviar o convite, o usuário bloqueou o bot, ou desativou as mensagens diretas no servidor! O convite não foi enviado"));
    } else if(channelSend===undefined) {
        message.channel.send(embedSend)
    } else if(channelSend!==undefined) {
        channelSend.send(embedSend)
    }
    }
}