const embedCreator = require("../functions/embedCreator");

module.exports = {
    name: "ping",
    permission: "NONE",
    description: "Check bot ping.",
    execute(message,args,client) {
        async function ping() {
            const pingCalculator = await message.channel.send("Calculando ping...");
            pingCalculator.edit(`Sucesso! O ping é ${pingCalculator.createdTimestamp - message.createdTimestamp}ms.`)
        }

        ping()
        const checkArgs = client.functions.get("checkArgs").execute(args,5)
        if(checkArgs === true) {
            console.log("Correct arguments.")
        } else {
            console.log("Incorrect arguments.")
        }

        const color = "#3380FF"
        const title = "Gladeon"
        const thumbnail = null
        const fields = (
            {name:'teste',value:'teste',inline:true}
        )
        const author = message.author

        client.functions.get("embedCreator").execute(color,title,thumbnail,fields,author,message)
    }
}