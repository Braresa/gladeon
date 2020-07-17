const discord = require("discord.js")
const { minimum } = require("./ban")
const embedCreator = require("../functions/embedCreator")

module.exports = {
    name: "invite",
    permission: "MANAGE_GUILD",
    minimum: 1,

    execute(message,args,client) {
        var targetMember = message.mentions.members.first()
        var targetUser = message.mentions.users.first()
        if(targetMember === undefined) {
            client.functions.get("embedCreator").execute('#3380FF',undefined,undefined,[{name:"Aconteceu um errro.",value:"Você precisa mencionar alguém para que eu possa enviar o convite."}],message.author,message)
        } else {
            var opts = {
                maxAge: 300,
                maxUses: 1,
                reason: `Invite criado por ${message.author.username}.`
            }

            async function functionCreateInvite() {
                var inviteCreate = await message.channel.createInvite(opts)
                var logsChannel = await client.channels.fetch('620030867460456471')
                client.functions.get("embedCreator").execute('#3380FF',undefined,undefined,[{name:"Você recebeu um convite.",value:`${message.author.username} te enviou um convite do **O grupo**: discord.gg/${inviteCreate.code}, o convite tem uma duração de 5 minutos, e só pode ser usado 1 vez, use com sabedoria.`}],message.author,targetUser,true,message)
                client.functions.get("embedCreator").execute('#3380FF',"Invite criado",undefined,[{name:"Autor:",value: `<@${message.author.id}>`, inline: true},{name:"Invite enviado a:",value: `<@${targetUser.id}>`,inline: true},{name:"Código do invite:",value: inviteCreate.code}],message.author,message,undefined,undefined,logsChannel)
            }

            functionCreateInvite()
            client.functions.get("embedCreator").execute('#3380FF',undefined,undefined,[{name:"Sucesso!",value:`Você enviou o convite para **${targetUser.username}** com sucesso!`}],message.author,message)


        }

    }

}