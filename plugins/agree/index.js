const { PupPlugin } = require('@pupbot/core')
const plugin = new PupPlugin('agree','1.0.0')
plugin.onMounted((bot)=>{
    plugin.on("request.group.add",(event)=>{
        bot.setGroupAddRequest()
    })
})
module.exports = { plugin }
