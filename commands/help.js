const { permission } = require("./ban");
const fs = require("fs");
require('dotenv/config');
module.exports = {
    name:"help",
    permission: "NONE",
    description: "Vê/checa todos os comandos disponíveis.",
    example: `${process.env.CLIENT_PREFIX}help [comando]`,
    minimum: 0,

    execute(message,args,client) {
        const allCommands = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));
        var embedCreator = client.functions.get("embedCreator")
        if(args[0]===undefined) {

        var arrayFields = []

        arrayFields.push({name:"Argumentos",value:"(): Obrigatório, []: Opcional."})
        var commandsValue = []
        allCommands.forEach(function(file,i) {
            var fileName = file.replace('.js','')
            commandsValue.push(`\n${fileName}`)
            if((i+1)===allCommands.length) {
                arrayFields.push({name:"Comandos:",value:commandsValue.join("")})

                embedCreator.execute("#3380FF",undefined,undefined,arrayFields,message.author,message)
            }
        });

        
    } else if(args[0]!==undefined) {
        for(var index = 0; index < allCommands.length; index++) {
            var commandName = allCommands[index].replace('.js','')
            if(args[0]===commandName) {
                embedCreator.execute("#3380FF",undefined,undefined,[{name:"Argumentos",value:"(): Obrigatório, []: Opcional."},{name:"Nome:",value: client.commands.get(commandName).name,inline:true},{name:"Argumentos necessários:",value:client.commands.get(commandName).minimum,inline:true},{name:"Descrição:",value:client.commands.get(commandName).description},{name:"Exemplo:",value:client.commands.get(commandName).example},{name:"Permissões:",value:`Você precisa da permissão: \`${client.commands.get(commandName).permission}\``}],message.author,message)
                break
            } else if(args[0]!==commandName && (index + 1)===allCommands.length){
                embedCreator.execute("#3380FF",undefined,undefined,[{name:"Aconteceu um erro.",value:"Este comando não existe, você pode ver todos os comandos disponíveis no !help."}],message.author,message) 
            }
        };
    }
}

}