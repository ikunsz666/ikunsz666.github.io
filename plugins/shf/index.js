const { PupPlugin,axios } = require('@pupbot/core')
const plugin = new PupPlugin('sfh', '1.0.0')
plugin.onMounted((bot)=>{
    plugin.on("message",async (event)=>{
        if(event.raw_message==="神回复"){
            get = await axios.get('https://v.api.aa1.cn/api/api-wenan-shenhuifu/index.php?aa1=json')
            event.reply(get.data[0].shenhuifu.replace(/<br>/g,"\r\r"))
        }
    })
})
module.exports = { plugin }