const fs = require('fs-extra')

module.exports = welcomeF = async (client, event) => {
    //console.log(event.action)
    const welkomF = JSON.parse(fs.readFileSync('./lib/freedom.json'))
    const isWelkomF = welkomF.includes(event.chat)
    try {
        if (event.action == 'add' && isWelkomF) {
            const gChat = await client.getChatById(event.chat)
            const pChat = await client.getContact(event.who)
            const { contact, groupMetadata, name } = gChat
            const pepe = await client.getProfilePicFromServer(event.who)
            const capt = `WELCOME TO FREEDOM STORE

JIKA INGIN CEK HARGA SILAHKAN KETIK *FF / ML / PUBG* (PILIH SALAH SATU) DI GRUP INI

DAN JUGA JANGAN LUPA PATUHI PERATURAN NYA :)

JIKA ADA PERTANYAAN / MASUKAN/ KRITIK
SILAHKAN HUBUNGI ADMIN : 
1. wa.me/6288233282599
2. wa.me/6285747528021`
            if (pepe == '' || pepe == undefined) {
                await client.sendText(event.chat, capt)
            } else {
                await client.sendText(event.chat, capt)
            }

        }
    } catch (err) {
        console.log(err)
    }
}