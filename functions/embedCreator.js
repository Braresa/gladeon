const discord = require("discord.js")

module.exports = {
    name:"embedCreator",
    execute(color,title,thumbnail,fields,author,message) {
    const embedSend = new discord.MessageEmbed()
	.setColor(color)
	.setAuthor('Gladeon')
	.setThumbnail(thumbnail)
	.addFields(fields)
	.setTimestamp()
	.setFooter(author.username,author.avatarURL)=
message.channel.send(embedSend);
    }
}