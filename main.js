// Setando variáveis
const cooldown = new Set();
require('dotenv/config');
const prefix = (process.env.CLIENT_PREFIX)
const discord = require("discord.js");
const client = new discord.Client();
const fs = require("fs");
client.commands = new discord.Collection();
client.functions = new discord.Collection();

// Iniciando command handler.

const allCommandsM = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));

for(const file of allCommandsM) {
    const cmd = require(`./commands/${file}`)
    client.commands.set(cmd.name, cmd)
}

console.log("Handler de comandos inicializado com sucesso!")

// Iniciando functions.

const allFunctions = fs.readdirSync("./functions").filter(file => file.endsWith('.js'));

for(const functionFile of allFunctions) {
    const func = require(`./functions/${functionFile}`)
    client.functions.set(func.name, func)

}

console.log("Handler de funções inicializado com sucesso!")

// Quando o cliente já inicou,

client.on("ready", () => {
    console.log(`Bot logado como ${client.user.username}!`);
    client.user.setActivity("Servindo ao Deus Braresa!", {type: "PLAYING"})
});

// Evento de mensagem, é meio confuso mesmo.

client.on("message", async message => {
    
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if (!message.content.startsWith(process.env.CLIENT_PREFIX)) return;

    var member = message.member

    const args = message.content.slice(process.env.CLIENT_PREFIX.length).trim().split(/ +/g)
    const realCmd = args.shift().toLowerCase();

    if(message.content.length > 1 && !message.content.endsWith(process.env.CLIENT_PREFIX)) {
        if(cooldown.has(message.author.id)) {
            message.channel.send(`Espere mais um pouco para poder digitar outro comando <@${message.author.id}>!`)
        } else if(!cooldown.has(message.author.id)) {
        cooldown.add(message.author.id)
        setTimeout(() => {
            cooldown.delete(message.author.id)
        }, 5000);

        if(client.commands.has(realCmd)) {

    if(client.commands.get(realCmd).permission === "NONE") {
        var checkArgs = client.functions.get("checkArgs").execute(args,client.commands.get(realCmd).minimum)
        if(checkArgs === true) {
        client.commands.get(realCmd).execute(message,args,client)
    } else if(checkArgs === false) {
        client.functions.get("embedCreator").execute("#3380FF","Gladeon",null,[{name:"Aconteceu um erro.",value:`Argumentos incorretos! O comando necessita de pelo menos **${client.commands.get(realCmd).minimum}** argumentos(s), se você tiver dúvida, digite !help **${client.commands.get(realCmd).name}**`}],message.author,message)
    }
    } else if(client.commands.get(realCmd).permission !== "NONE") {
    if(message.member.hasPermission(client.commands.get(realCmd).permission) === true) {
        var checkArgs = client.functions.get("checkArgs").execute(args,client.commands.get(realCmd).minimum)
        if(checkArgs === true) {
        client.commands.get(realCmd).execute(message,args,client)
    } else if(checkArgs === false) {
        client.functions.get("embedCreator").execute("#3380FF","Gladeon",null,[{name:"Aconteceu um erro.",value:`Argumentos incorretos! O comando necessita de pelo menos **${client.commands.get(realCmd).minimum}** argumento(s), se você tiver dúvida, digite !help **${client.commands.get(realCmd).name}**`}],message.author,message)
    }
    } else if(message.member.hasPermission(client.commands.get(realCmd).permission) !== true) {
        client.functions.get("embedCreator").execute("#3380FF","Gladeon",null,[{name:'Aconteceu um erro.',value: `Você precisa da permissão: *${client.commands.get(realCmd).permission}*`}],message.author,message)
    }
    }
} else {
    if(message.content.length === 1 || message.content.endsWith(process.env.CLIENT_PREFIX)) {

} else if(message.content.length > 1 && !message.content.endsWith(process.env.CLIENT_PREFIX)) {
    client.functions.get("embedCreator").execute("#3380FF","Gladeon",null,[{name:'Aconteceu um erro.',value: "Comando desconhecido, digite !help para ver os comandos disponíveis."}],message.author,message)
}
}
}
}
})

client.login(process.env.CLIENT_TOKEN);