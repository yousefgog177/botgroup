const request = require('request-promise-native');
const Url = require('url');
const vm = require('vm');
const fetch = require("node-fetch");
let ws = require('ws')

const {
  randomFromRange,
  randomTrueFalse,
  delay,
  uuid,
  getRandomUserAgent
} = require('./src/utilsH');

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
    url: `https://hcaptcha.com/checksiteconfig?host=${host}&sitekey=${sitekey}&sc=1&swa=1`
  });

let func = async(sloved) => {
  let timestamp = Date.now() + randomFromRange(30, 120);
let hsla = sloved

let res = await request({
    method: 'post',
    headers,
    json: true,
    url: 'https://hcaptcha.com/getcaptcha?s=${sitekey}',
    form: {
hl: "ar",
v: "9bacbe4",
      sitekey,
      host: host,
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
  const answers = tasks.reduce((accum, t) => ({ ...accum, [t.task_key]: randomTrueFalse() }), {});
  const captchaResponse = {
    answers,
    sitekey,
    serverdomain: host,
    job_mode: job,
    motionData: {
      st: timestamp,
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

return { hsw: response.c.req, sitekey:sitekey, function: func}
// // let getN = await getData(response.c.req, sitekey)
}

async function solveCaptcha(url, sitekey, options = {}) {
  const { gentleMode, timeoutInMs = 12000000 } = options;
  const { hostname } = Url.parse(url);
  const siteKey = sitekey || "f5561ba9-8f1e-40ca-9b5b-a0b3f719ef34"
  const startingTime = Date.now();

  while (true) {
    try {
      const result = await tryToSolve(siteKey, url);
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