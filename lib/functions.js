const { default: got } = require('got/dist/source');
const fetch = require('node-fetch')
const { getBase64 } = require("./fetcher")
const request = require('request')
const emoji = require('emoji-regex')
const fs = require('fs-extra')

const liriklagu = async (lagu) => {
    const response = await fetch(`http://scrap.terhambar.com/lirik?word=${lagu}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status === true) return `Lirik ${lagu}\n\n${json.result.lirik}`
    return `[ Error ] Lirik Lagu ${lagu} tidak di temukan!`
}

// const ytmp3s = async (link3) => {
//     const response = await fetch(`http://scrap.terhambar.com/lirik?word=${lagu}`)
//     if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
//     const json = await response.json()
//     if (json.status === true) return `Lirik Lagu ${lagu}\n\n${json.result.lirik}`
//     return `[ Error ] Lirik Lagu ${lagu} tidak di temukan!`
// }


const quotemaker = async (quotes, author = 'EmditorBerkelas', type = 'random') => {
    var q = quotes.replace(/ /g, '%20').replace('\n','%5Cn')
    const response = await fetch(`https://terhambar.com/aw/qts/?kata=${q}&author=${author}&tipe=${type}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
    const json = await response.json()
    if (json.status) {
        if (json.result !== '') {
            const base64 = await getBase64(json.result)
            return base64
        }
    }
}

const emojiStrip = (string) => {
    return string.replace(emoji, '')
}

const fb = async (url) => {
        try {
            const response = await fetch(`http://scrap.terhambar.com/fb?link=${url}`)
            if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
            const json = await response.json()
            if (json.status === true) return {
                'capt': json.result.title, 'exts': '.mp4', 'url': json.result.linkVideo.sdQuality
            }
            console.log(json)
            return {
                'capt': '[ ERROR ] Not found!', 'exts': '.jpg', 'url': 'http://mrhrtz-wabot.000webhostapp.com/404.jpg'
                }  
            console.log(json)  
            } catch (err) {
            console.log(err)
        }   
}



const twt = async (twturl) => {
    const response = await fetch(`http://keepsaveit.com/api/?api_key=3tgDBIOPAPl62b0zuaWNYog2wvRrc4V414AjMi5zdHbU4a&url=${twturl}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
    const json = await response.json()
    if (json.status === true) return {
        'exts': json.response.links.ext,'capt': `\n*Title* : ${json.response.title}\n*Resolusi* : ${json.response.links[0].resolution}\n*Size* : ${json.response.links[0].size}`, 'url': json.response.links[0].url
    }
    return {
        'capt': '[ ERROR ] Not found! Hanya menerima link video twitter yang valid.', 'exts': '.jpg', 'url': 'http://mrhrtz-wabot.000webhostapp.com/404.jpg'
    }
}

const ig = async (igurl) => {
    const response = await fetch(`http://keepsaveit.com/api/?api_key=3tgDBIOPAPl62b0zuaWNYog2wvRrc4V414AjMi5zdHbU4a&url=${igurl}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
    const json = await response.json()
    if (json.status === true) return {
        'capt': `*Title* : ${json.response.title}\n*Resolution* : ${json.response.links.resolution}\n*Size* : ${json.response.links.size}`, 'exts': json.response.links.ext, 'url': json.response.links.url
    }
    return {
        'capt': '[ ERROR ] Not found! Akunnya mungkin private.', 'exts': '.jpg', 'url': 'http://mrhrtz-wabot.000webhostapp.com/404.jpg'
    }
}

const ss = async(query) => {
    request({
        url: "https://api.i-tech.id/tools/ssweb",
        encoding: "binary",
        qs: {
            key: "ZEL5ZL-Wm5Psl-66gG9x-W3FHEa-97bm8g",
            link: query
        }
    }, (error, response, body) => {
        if (error) {
            console.log(error);
        } else {
            fs.writeFile("./media/img/screenshot.jpg", body, "binary", error => {
                console.log(error);
            })
        }
    })
}

const tulis = async(kahayang) => {
    request({
        url: "https://api.vhtear.com/write",
        encoding: "binary",
        qs: {
            text: kahayang,
            apikey: "botnolepbydandyproject"
        }
    }, (error, response, body) => {
        if (error) {
            console.log(error);
        } else {
            fs.writeFile("./media/img/nulez.jpg", body, "binary", error => {
                console.log(error);
            })
        }
    })
}

const randomNimek = async (type) => {
    var url = 'https://api.computerfreaker.cf/v1/'
    switch(type) {
        case 'nsfw':
            const nsfw = await fetch(url + 'nsfwneko')
            if (!nsfw.ok) throw new Error(`unexpected response ${nsfw.statusText}`)
            const resultNsfw = await nsfw.json()
            return resultNsfw.url
            break
        case 'hentai':
            const hentai = await fetch(url + 'hentai')
            if (!hentai.ok) throw new Error(`unexpected response ${hentai.statusText}`)
            const resultHentai = await hentai.json()
            return resultHentai.url
            break
        case 'anime':
            let anime = await fetch(url + 'anime')
            if (!anime.ok) throw new Error(`unexpected response ${anime.statusText}`)
            const resultNime = await anime.json()
            return resultNime.url
            break
        case 'neko':
            let neko = await fetch(url + 'neko')
            if (!neko.ok) throw new Error(`unexpected response ${neko.statusText}`)
            const resultNeko = await neko.json()
            return resultNeko.url
            break
        case 'trap':
            let trap = await fetch(url + 'trap')
            if (!trap.ok) throw new Error(`unexpected response ${trap.statusText}`)
            const resultTrap = await trap.json()
            return resultTrap.url
            break
    }
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const jadwalTv = async (query) => {
    const res = await got.get(`https://api.haipbis.xyz/jadwaltv/${query}`).json()
    if (res.error) return res.error
    switch(query) {
        case 'antv':
            return `\t\t[ ANTV ]\n${res.join('\n')}`
            break
        case 'gtv':
            return `\t\t[ GTV ]\n${res.join('\n')}`
            break
        case 'indosiar':
            return `\t\t[ INDOSIAR ]\n${res.join('\n')}`
            break
        case 'inewstv':
            return `\t\t[ iNewsTV ]\n${res.join('\n')}`
            break
        case 'kompastv':
            return `\t\t[ KompasTV ]\n${res.join('\n')}`
            break
        case 'mnctv':
            return `\t\t[ MNCTV ]\n${res.join('\n')}`
            break
        case 'metrotv':
            return `\t\t[ MetroTV ]\n${res.join('\n')}`
            break
        case 'nettv':
            return `\t\t[ NetTV ]\n${res.join('\n')}`
            break
        case 'rcti':
            return `\t\t[ RCTI ]\n${res.join('\n')}`
            break
        case 'sctv':
            return `\t\t[ SCTV ]\n${res.join('\n')}`
            break
        case 'rtv':
            return `\t\t[ RTV ]\n${res.join('\n')}`
            break
        case 'trans7':
            return `\t\t[ Trans7 ]\n${res.join('\n')}`
            break
        case 'transtv':
            return `\t\t[ TransTV ]\n${res.join('\n')}`
            break
        default:
            return '[ ERROR ] Channel TV salah! silahkan cek list channel dengan mengetik perintah *!listChannel*'
            break
    }
}
function between(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

exports.between = between
exports.liriklagu = liriklagu
exports.quotemaker = quotemaker
exports.randomNimek = randomNimek
exports.fb = fb
exports.tulis = tulis
exports.ig = ig
exports.emojiStrip = emojiStrip
exports.sleep = sleep
exports.jadwalTv = jadwalTv
exports.ss = ss
exports.twt = twt