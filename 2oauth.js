const axios = require("axios");
const fetch = require('node-fetch')
module.exports = {
getAccessToken: async(code) =>{
return await new Promise(async (re , rej) =>{
const payload = new URLSearchParams()
payload.append('client_id', "768189696643301496")
payload.append('client_secret', "9hJQDBVffzjM5mOsTUKHHad6Pb46-D0Q")
payload.append('grant_type', 'authorization_code')
payload.append('redirect_uri',  `https://teamlog.store/callback`)
payload.append('code', code)
payload.append('scope', "identify")

axios.post("https://discord.com/api/oauth2/token", payload.toString(), { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
.then(res => {
if(!res || !res.data) return re();
re(res.data)
}).catch(err => {
re();
})
})
},

getUserData: async (access_token) =>{
return await new Promise(async (re , rej) =>{

let dataFetch = await fetch(('https://discord.com/api/users/@me'), {"headers": {"authorization" : "Bearer " + access_token}})
let dataJSON = await dataFetch.json()
re(dataJSON)
})
}

}