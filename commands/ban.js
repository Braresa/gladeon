const discord = require("discord.js")

module.exports = {
   name: "ban",
   permission: "BAN_MEMBERS",
   description: "Ban peoples.",
   execute(message,args,client) {

    console.log("a")

       if(args[0] === undefined) {
           message.channel.send("Mencione alguém para que eu possa banir!")
       }
       else if(args[0] !== undefined) {

           if(args[1] === undefined) {
               message.channel.send("Você precisa especificar o número de dias para que eu possa banir!")
           }

        else if(args[1] !== undefined) {

            if(args[2] === undefined) {
                message.channel.send("Você precisa especificar o motivo do banimento!")
            }

    
        else if(args[2] !== undefined) {

           var targetRaw = args[0]
           var targetUser = message.mentions.members.first()
           var targetUserNotMember = message.mentions.users.first() || args[0]

           if(targetUser.bannable === true && targetUserNotMember.bot === false) {
            var motivo = args.slice(2).join(' ')
            var dias = args[1]
            if(!isNaN(dias)) {
            targetUser.ban({days: args[1], reason: motivo})
            .then(message.channel.send(`Sucesso! Usuário banido por **${args[1]}** dia(s)`))
            .catch(message.channel.send("Ops! Aconteceu algum erro ao banir o usuário."),console.error())
        } 
        
        else if(isNaN(dias)) {
            message.channel.send("Ops! Algo deu errado, o número de dias informados é inválido.")
        }

        } else if(targetUserNotMember.bot === true || targetUser.bannable === false) {
            message.channel.send("Ops! Algo deu errado, aparentemente este usuário não pode ser banido, possa ser que o cargo dele é maior que o meu, ou ele é um bot.")
        }
    }
       }
    }
}
}