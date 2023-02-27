const { PupPlugin } = require('@pupbot/core')
const plugin = new PupPlugin('chehui', '1.0.0')
plugin.onMounted((bot)=>{
    plugin.on('message.group',(event)=>{
        function deleteMsg(History){
            var nextDelete = History[0]
            console.log(nextDelete.message_id)
            for(let i=0; i<History.length; i++){
                bot.deleteMsg(History[i].message_id)
            }

            bot.getChatHistory(nextDelete.message_id).then((next)=>{
                deleteMsg(next)
            })
        }
        if(event.raw_message==="批量撤回" && (event.sender.role==="admin" | event.sender.role==="owner")){
            const chatHistory = bot.getChatHistory(event.message_id)
            chatHistory.then((History)=>{
                deleteMsg(History)
            })
        }
    })
})
module.exports = { plugin }