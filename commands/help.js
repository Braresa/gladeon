const { permission } = require("./ban");
const fs = require("fs");

module.exports = {
    name:"help",
    permission: "NONE",
    description: "comando help",
    minimum: 0,

    execute(message,args,client) {
        const allCommands = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));
        var embedCreator = client.functions.get("embedCreator")

        var arrayFields = []

        arrayFields.push({name:"Argumentos",value:"(): Obrigátorio, []: Opcional."})
        var commandsValue = []
        allCommands.forEach(function(file,i) {
            var fileName = file.replace('.js','')
            commandsValue.push(`\n${fileName}`)
            console.dir(commandsValue)
            if((i+1)===allCommands.length) {
                arrayFields.push({name:"Comandos:",value:commandsValue.join("")})

                embedCreator.execute("#3380FF",undefined,undefined,arrayFields,message.author,message)
            }
        });

        
    }

}