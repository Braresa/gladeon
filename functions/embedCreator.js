const discord = require("discord.js")

module.exports = {
    name:"embedCreator",
    execute(color,title,thumbnail,fields,author,message) {
    const embedSend = new discord.MessageEmbed()
	.setColor(color)
	.setAuthor('Gladeon','https://i.imgur.com/vSm6wXn.png')
	.setThumbnail(thumbnail)
    .addFields(fields)
    .setTimestamp()
	.setFooter(author.username, message.author.avatarURL)
    message.channel.send(embedSend);
    }
}