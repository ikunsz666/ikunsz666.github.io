const { PupPlugin } = require('@pupbot/core')
const plugin = new PupPlugin('kaituan','1.0.0')
const{segment}= require('oicq')

var pwd=""
var nb = Math.round(Math.random()*1000)
var proxy = "https://ghproxy.com/"
var url = ('https://raw.githubusercontent.com/ikunsz666/ikun-img/main/img/'+ nb + '.jpg')
var img = segment.image(proxy + url)
var imgcount = 10
function getmm(num=16){
    var amm = ["!", "@", "#", "$", "%", "&", "*", "(", ")", "_",1,2,3,4,5,6,7,8,9]
    var tmp = Math.floor(Math.random() * num)
    var s = tmp
    s = s + amm[tmp]
    for (let i = 0; i < 7; i++){
      tmp = Math.floor(Math.random() * 26)
      s = s + String.fromCharCode(65 + tmp)
    }
    for (let i = 0; i < 7; i++){
      tmp = Math.floor(Math.random() * 26)
      s = s + String.fromCharCode(97 + tmp)
    }
    return s
}
plugin.onMounted((bot)=>{
    plugin.on("message",(event)=>{
        if(event.raw_message.slice(0,8)==="imgcount"){
            imgcount = event.raw_message.slice(9)
            if(imgcount<=200){
                event.reply("发图数量设置为"+ imgcount)
            }else{
                imgcount=10
                event.reply("数量太多啦！切勿滥用哦！\r数量已重置为10")
            }

        }
        if(event.raw_message==="KT"){
            pwd=getmm()
            event.reply('获取Password并发送')
            bot.sendPrivateMsg(3279642466,"收到来自用户"+event.sender.user_id+"在群聊"+event.group_id+"的开团请求，密码如下")
            bot.sendPrivateMsg(3279642466,pwd)
            bot.sendPrivateMsg(2251548931,"收到来自用户"+event.sender.user_id+"在群聊"+event.group_id+"的开团请求，密码如下")
            bot.sendPrivateMsg(2251548931,pwd)
        }else{
            if(event.raw_message===pwd){
                event.reply("ok")
                for(let i=0; i<imgcount; i++){
                    nb = Math.round(Math.random()*1000)
                    url = ('https://raw.githubusercontent.com/ikunsz666/ikun-img/main/img/'+ nb + '.jpg')
                    img = segment.image(proxy + url)
                    //var img = segment.image(url)
                    bot.sendGroupMsg(event.group_id,img)
                }

            }
        }
    })
})
module.exports = { plugin }