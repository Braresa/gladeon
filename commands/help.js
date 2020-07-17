const { permission } = require("./ban");

module.exports = {
    name:"help",
    permission: "NONE",
    minimum: 0,

    execute(message,args,client) {
        const allCommands = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));
        var embedCreator = client.functions.get("embedCreator")

        embedCreator.execute("#3380FF",undefined,undefined)



        for(const file of allCommands) {

        }
    }

}