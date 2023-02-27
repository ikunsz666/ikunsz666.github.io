const { PupPlugin,axios,segment } = require('@pupbot/core')
const plugin = new PupPlugin('pixiv','1.0.0')
var r18 = false
var admins = [3279642466,1746118314,2874890612]
plugin.onMounted((bot)=>{
    plugin.on("message.private.friend",async (event)=>{
        if(event.raw_message==="涩图"){
            var hz1=segment.image('https://ghproxy.com/https://raw.githubusercontent.com/ikunsz666/ikun-img/main/img/lz1.jpg')
            var hz2=segment.image('https://ghproxy.com/https://raw.githubusercontent.com/ikunsz666/ikun-img/main/img/lz2.png')
            event.reply([hz1,hz2,"最新猴子，点名表扬\r259391873,1789750787"])
            if(r18===true){
                var get = await axios.get('https://api.lolicon.app/setu/v2?r18=1')
            }else{
                var get = await axios.get('https://api.lolicon.app/setu/v2?r18=0')
            }
            const url = get.data.data[0].urls.original
            console.log(url)
            const img = segment.image(url)
            if(r18===true){
                event.reply('[Pixiv][R18]'+url+"\n图片发送不稳定，可先查看该链接")
            }else{
                event.reply('[Pixiv] '+url+"\n图片发送不稳定，可先查看该链接")
            }  
            event.reply(img)
        }
        if(event.raw_message==="r18"){
            if(admins.includes(event.sender.user_id)){
                if(r18===false){
                    r18=true
                    event.reply("r18模式已开启")
                }else{
                    r18=false
                    event.reply("r18模式已关闭")
                }
            }else{
                event.reply("权限不足，无法开启r18模式",true)
            }

        }
    })
})
module.exports = { plugin }
