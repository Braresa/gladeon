const discord = require("discord.js")

module.exports = {
    name:"embedCreator",
    execute(color,title,thumbnail,fields,author,message,dm,messageReal,channel) {
    const embedSend = new discord.MessageEmbed()
	.setColor(color)
	.setAuthor('Gladeon','https://i.imgur.com/vSm6wXn.png')
	.setThumbnail(thumbnail)
    .addFields(fields)
    .setTimestamp()
    .setFooter(author.username)
    if(dm===true && dm !== undefined && messageReal !== undefined) {
    message.send(embedSend)
    .catch(() => messageReal.channel.send("Ops! Aconteceu um erro ao enviar o convite, o usuário bloqueou o bot, ou desativou as mensagens diretas no servidor! O convite não foi enviado."));
    } else if(channel===undefined) {
        message.channel.send(embedSend)
    } else if(channel!==undefined) {
        channel.send(embedSend)
    }
    }
}