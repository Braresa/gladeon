require('dotenv/config');

const checkArgs = require('../functions/checkArgs');
const { YouTube, Language } = require('popyt')
const youtube = new YouTube(process.env.API_YOUTUBE,undefined,undefined,'pt_BR','BR')

module.exports = {
    name: "youtube",
    permission: "NONE",
    minimum: 1,
    description: "Procura por vídeos do youtube.",
    example: `${process.env.CLIENT_PREFIX}youtube (texto a ser pesquisado)`,
    execute(message,args,client) {

       async function searchVideo() {
           var result = await youtube.searchVideos(args.slice(0).join(" "),1)
            message.channel.send(result.results[0].url)
       }
       searchVideo()
    }
}
