const request = require('request-promise-native');
const Url = require('url');
const vm = require('vm');
const fetch = require("node-fetch");

const {
  randomFromRange,
  randomTrueFalse,
  delay,
  uuid,
  getRandomUserAgent
} = require('./src/utils');

function getMouseMovements(timestamp) {
  let lastMovement = timestamp;
  const motionCount = randomFromRange(1000, 10000);
  const mouseMovements = [];
  for (let i = 0; i < motionCount; i++) {
    lastMovement += randomFromRange(0, 10);
    mouseMovements.push([randomFromRange(0, 500), randomFromRange(0, 500), lastMovement]);
  }
  return mouseMovements;
}
async function getData(t) {
return await new Promise((resolve, reject) => {
let ws = require('ws')
this.headers = {
"User-Agent": "Glitch",
}
var project = new ws( 'wss://groupbot-onepexils.glitch.me/' , { headers:this.headers })

project.on('open', function incoming() {
project.send(JSON.stringify({event: "request-hsw", data: {siteky: "f5561ba9-8f1e-40ca-9b5b-a0b3f719ef34", token: t}}))
})


project.on('message', function incoming(message) {

let msg = JSON.parse(message)
if(msg.event === "new-hsw") return resolve(msg.data)
})

})
}
let hslFile;


async function tryToSolve(sitekey, host) {
  const userAgent = getRandomUserAgent();
  const headers = {
    'User-Agent': userAgent
  };
  
  let response = await request({
    method: 'get',
    headers,
    json: true,
    url: `https://hcaptcha.com/checksiteconfig?host=thissystem.glitch.me&sitekey=f5561ba9-8f1e-40ca-9b5b-a0b3f719ef34&sc=1&swa=1`
  });

let getN = await getData(response.c.req)
  let timestamp = Date.now() + randomFromRange(30, 120);
let hsla = getN.hsw

let res = await request({
    method: 'post',
    headers,
    json: true,
    url: 'https://hcaptcha.com/getcaptcha?s=f5561ba9-8f1e-40ca-9b5b-a0b3f719ef34',
    form: {
hl: "ar",
v: "9bacbe4",
      sitekey,
      host: "discord.com",
n: hsla,
      c: JSON.stringify(response.c),

      motionData: {
"st":timestamp,
"v":1,
"topLevel":
{
"st":timestamp,
"sc":{
"availWidth":1536,
"availHeight":816,
"width":1536,
"height":864,
"colorDepth":24,
"pixelDepth":24,
"availLeft":0,
"availTop":0
},
"nv":
{
"vendorSub":"",
"productSub":"20030107",
"vendor":"Google Inc.",
"maxTouchPoints":0,
"userActivation":{},
"doNotTrack":null,
"geolocation":{},
"connection":{},
"webkitTemporaryStorage":{},
"webkitPersistentStorage":{},
"hardwareConcurrency":8,
"cookieEnabled":true,
"appCodeName":"Mozilla",
"appName":"Netscape",
"appVersion":"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.62",
"platform":"Win32",
"product":"Gecko",
"userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.62",
"language":"ar","languages":["ar","en","en-GB","en-US"],
"onLine":true,
"webdriver":false,
"mediaCapabilities":{},
"mediaSession":{},
"scheduling":{},
"permissions":{},
"plugins":["internal-pdf-viewer","internal-nacl-plugin","mhjfbmdgcfjbbpaeojofohoefgiehjai"]},
"dr":"",
"inv":false,
"exec":true,
"wn":[],
"wn-mp":0,
"xy":[],
"xy-mp":34.5
           },
        dct: timestamp,
        mm: getMouseMovements(timestamp)
      }}});
response = res
  if (response.generated_pass_UUID) {
    return response.generated_pass_UUID;
  }
  const key = response.key;
  const tasks = response.tasklist;
  const job = response.request_type;
  timestamp = Date.now() + randomFromRange(30, 120);
var answerss = {}
var trueN = 0

for(const d of tasks){

var status = randomTrueFalse()

answerss[d.task_key] = status
}/*
  const answers = tasks.reduce((accum, t) => ({ 
...accum,

 [t.task_key]: status
}), {});*/
  const captchaResponse = {
    answerss,
    sitekey,
    serverdomain: host,
    job_mode: job,
    motionData: {
"st":timestamp,
"v":1,
"topLevel":
{
"st":timestamp,
"sc":{
"availWidth":1536,
"availHeight":816,
"width":1536,
"height":864,
"colorDepth":24,
"pixelDepth":24,
"availLeft":0,
"availTop":0
},
"nv":
{
"vendorSub":"",
"productSub":"20030107",
"vendor":"Google Inc.",
"maxTouchPoints":0,
"userActivation":{},
"doNotTrack":null,
"geolocation":{},
"connection":{},
"webkitTemporaryStorage":{},
"webkitPersistentStorage":{},
"hardwareConcurrency":8,
"cookieEnabled":true,
"appCodeName":"Mozilla",
"appName":"Netscape",
"appVersion":"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.62",
"platform":"Win32",
"product":"Gecko",
"userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.62",
"language":"ar","languages":["ar","en","en-GB","en-US"],
"onLine":true,
"webdriver":false,
"mediaCapabilities":{},
"mediaSession":{},
"scheduling":{},
"permissions":{},
"plugins":["internal-pdf-viewer","internal-nacl-plugin","mhjfbmdgcfjbbpaeojofohoefgiehjai"]},
"dr":"",
"inv":false,
"exec":true,
"wn":[],
"wn-mp":0,
"xy":[],
"xy-mp":34.5
           },
      dct: timestamp,
      mm: getMouseMovements(timestamp)
    }
  };

  response = await request(`https://hcaptcha.com/checkcaptcha/${key}`, {
    method: 'post',
    headers,
    json: true,
    form: captchaResponse
  });
console.log(captchaResponse)
  if (response.generated_pass_UUID) {
    return response.generated_pass_UUID;
  }
}

async function solveCaptcha(url, options = {}) {
  const { gentleMode, timeoutInMs = 12000000 } = options;
  const { hostname } = Url.parse(url);
  const siteKey = "f5561ba9-8f1e-40ca-9b5b-a0b3f719ef34"
  const startingTime = Date.now();

  while (true) {
    try {
      const result = await tryToSolve(siteKey, hostname);
      if (result) {
        return result;
      }
    } catch (e) {
      if (e.statusCode === 429) {
        // reached rate limit, wait 30 sec
        await delay(30000);
      } else {
        throw e;
      }
    }
    if (Date.now() - startingTime > timeoutInMs) {
      throw new Error('captcha resolution timeout');
    }
    if (gentleMode) {
      // wait a bit to avoid rate limit errors
      delay(3000);
    }
  }
}

module.exports = solveCaptcha;