const discord = require("discord.js")

module.exports = {
    name:"checkArgs",
    execute(args,minimum) {
        var result = false
        for(var i = 0; i < minimum;i++) {
            if(args[i] !== undefined) {
                console.log(`true ${i}`)
                result = true;
            } else if(args[i] === undefined) {
                console.log(`false ${i}`)
                result = false
                break
            }

            }
        return result;
    }
}