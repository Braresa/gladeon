module.exports = {
    name: "ping",
    description: "Check bot ping.",
    execute(message,args,client) {
        async function ping() {
            const pingCalculator = await message.channel.send("Calculando ping...");
            pingCalculator.edit(`Sucesso! O ping é ${pingCalculator.createdTimestamp - message.createdTimestamp}ms.`)
        }
        console.log
        ping()
        const checkArgs = client.functions.get("checkArgs").execute(args,5)
        if(checkArgs === true) {
            console.log("Correct arguments.")
        } else {
            console.log("Incorrect arguments.")
        }
    }
}