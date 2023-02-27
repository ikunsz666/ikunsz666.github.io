const { PupPlugin } = require('@pupbot/core')
const plugin = new PupPlugin('xiaoheizi','1.1.4')
const{segment}= require('oicq')
const fs = require('fs')
const download = require('download')

const config = plugin.loadConfig()

function repeatStringNumTimes(str, num){
    var repeatedString = ""
    while (num > 0){
        repeatedString += str
        num--
    }
    return repeatedString
}
plugin.onMounted(()=>{
    plugin.on('message',async (event)=>{
        if(event.message[0].type === "image" && !config.imgs.includes(event.message[0].file)){
            console.log(event.message[0].file)
            config.imgs.push(event.message[0].file)
            await download(event.message[0].url, 'D:/ikunBOT/img/')
            if(event.message[0].file.endsWith("jpg")){
                config.jpg = config.jpg+1
                fs.rename('D:/ikunBOT/img/0.jpg','D:/ikunBOT/img/'+config.jpg+'.jpg',(err)=>{})
                //event.reply("已收集新表情包")
                //event.reply("坤图小助手\r目前拥有表情包数：1003\r现已收集表情包："+config.jpg+"\r现已收集动图："+config.gif+'\r收集功能正常运行中')
            }else{
                if(event.message[0].file.endsWith("gif")){
                    config.gif = config.gif+1
                    fs.rename('D:/ikunBOT/img/0.gif','D:/ikunBOT/img/'+config.gif+'.gif',(err)=>{})
                    //event.reply("已收集新动图")
                    //event.reply("坤图小助手\r目前拥有表情包数：1003\r现已收集表情包："+config.jpg+"\r现已收集动图："+config.gif+'\r收集功能正常运行中')
                }
            }
            plugin.saveConfig(config)
        }


        if(event.raw_message==="图库"){
            var imgcount = config.jpg+config.gif
            var progress = Math.round((imgcount/10000)*10)
            event.reply("-=坤图小助手=-\r总图数"+imgcount +"\r现已收集表情包："+config.jpg+"\r现已收集动图："+config.gif+'\r收集功能正常运行中')
            event.reply("-=万图计划=-\r"+imgcount+"/10000\r["+repeatStringNumTimes("=", progress)+repeatStringNumTimes("-",(10 - progress))+"]")
        }else if(event.raw_message==="坤曲"){
            event.reply("加载坤曲中，请稍等")
            event.reply(segment.record('https://ghproxy.com/https://raw.githubusercontent.com/ikunsz666/ikun-img/main/kunqu/'+Math.round(Math.random()*51)+'.mp3'))
        }

        if(event.raw_message==="坤图"){
            var hz1=segment.image('https://ghproxy.com/https://raw.githubusercontent.com/ikunsz666/ikun-img/main/img/lz1.jpg')
            var hz2=segment.image('https://ghproxy.com/https://raw.githubusercontent.com/ikunsz666/ikun-img/main/img/lz2.png')
            //event.reply([hz1,hz2,"最新猴子，点名表扬\r259391873,1789750787"])
            var nb = Math.round(Math.random()*1000)
            var proxy = "https://ghproxy.com/"
            var url = ('https://raw.githubusercontent.com/ikunsz666/ikun-img/main/img/'+ nb + '.jpg')
            var img = segment.image(proxy + url)
            //var img = segment.image(url)
            event.reply(img,false)
            event.reply(segment.record("https://ghproxy.com/https://raw.githubusercontent.com/ikunsz666/ikun-img/main/kunqu/ngm.mp3"),false)
        }
    })
})
module.exports = { plugin }