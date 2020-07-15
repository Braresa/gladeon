require('dotenv/config');

const checkArgs = require('../functions/checkArgs');
const { YouTube, Language } = require('popyt')
const youtube = new YouTube(process.env.API_YOUTUBE,undefined,undefined,'pt_BR','BR')

module.exports = {
    name: "youtube",
    permission: "NONE",
    minimum: 1,
    description: "search for youtube videos",
    execute(message,args,client) {

       async function searchVideo() {
           var result = await youtube.searchVideos(args.slice(0).join(" "),2)
            message.channel.send(result.results[1].url)
       }
       searchVideo()
    }
}
