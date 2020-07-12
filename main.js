// Setando variáveis
require('dotenv/config');
const prefix = (process.env.CLIENT_PREFIX)
const discord = require("discord.js");
const client = new discord.Client();
const fs = require("fs");
const bot = new discord.Client({disableEveryone: true});
client.commands = new discord.Collection();

// Iniciando command handler.

const allCommands = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));

for(const file of allCommands) {
    const cmd = require(`./commands/${file}`)
    console.log(`${file} carregado com sucesso!`)
    client.commands.set(cmd.name, cmd)

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

    const args = message.content.slice(process.env.CLIENT_PREFIX.length).trim().split(/ +/g)
    const realCmd = args.shift().toLowerCase();

    if(!client.commands.has(realCmd)) return;
    client.commands.get(realCmd).execute(message,args,client)
})

console.log(prefix)

client.login(process.env.CLIENT_TOKEN);