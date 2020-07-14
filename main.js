// Setando variáveis
require('dotenv/config');
const prefix = (process.env.CLIENT_PREFIX)
const discord = require("discord.js");
const client = new discord.Client();
const fs = require("fs");
const bot = new discord.Client({disableEveryone: true});
client.commands = new discord.Collection();
client.functions = new discord.Collection();

// Iniciando command handler.

const allCommands = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));

for(const file of allCommands) {
    const cmd = require(`./commands/${file}`)
    console.log(`${file} carregado com sucesso!`)
    client.commands.set(cmd.name, cmd)

}

// Iniciando functions.

const allFunctions = fs.readdirSync("./functions").filter(file => file.endsWith('.js'));

for(const functionFile of allFunctions) {
    const func = require(`./functions/${functionFile}`)
    console.log(`${functionFile} carregado com sucesso!`)
    client.functions.set(func.name, func)

}

// Quando o cliente já inicou,

client.on("ready", () => {
    console.log(`Bot logado como ${client.user.username}!`);
    client.user.setActivity("Servindo ao Deus Braresa!", {type: "PLAYING"})
});

// Evento de mensagem.

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if (!message.content.startsWith(process.env.CLIENT_PREFIX)) return;

    var member = message.member

    const args = message.content.slice(process.env.CLIENT_PREFIX.length).trim().split(/ +/g)
    const realCmd = args.shift().toLowerCase();

    if(!client.commands.has(realCmd)) return;
    console.log(message.content)

    if(client.commands.get(realCmd).permission === "NONE") {
        client.commands.get(realCmd).execute(message,args,client)
    } else if(client.commands.get(realCmd).permission !== "NONE") {
    if(message.member.hasPermission(client.commands.get(realCmd).permission) === true) {
    client.commands.get(realCmd).execute(message,args,client)
    } else if(message.member.hasPermission(client.commands.get(realCmd).permission) !== true) {
        client.functions.get("embedCreator").execute("#3380FF","Gladeon",null,({name:'Sem permissão!',value: `Você precisa da permissão: *${client.commands.get(realCmd).permission}*`}),message.author,message)
    }
    }
})

console.log(prefix)

client.login(process.env.CLIENT_TOKEN);