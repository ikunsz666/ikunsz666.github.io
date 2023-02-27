const { PupPlugin,axios,segment } = require('@pupbot/core')
const plugin = new PupPlugin('cosplay', '1.0.0')
plugin.onMounted((bot)=>{
    plugin.on("message",async (event)=>{
        if(event.raw_message.slice(0,3)==="查拦截"){
            var url = "https://xiaoapi.cn/API/zs_lj.php?url="+event.raw_message.slice(3)
            var get = axios.get(url)
            get.then((getData)=>{
                event.reply("查询网站拦截\r网站："+getData.data.url+"\rQQ是否拦截："+getData.data.qq_msg+"\r微信是否拦截："+getData.data.vx_msg)
            })
        }
    })
})
module.exports = { plugin }