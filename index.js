const http = require("http");
const express = require("express");
const app = express();
const fs = require("fs");
var nodemailer = require('nodemailer');
const websocket = require("./gateway/ws.js");
const fetch = require('node-fetch')


const bodyParser = require('body-parser');
app.use(bodyParser.json());

let Client = require('./client.js');

const server = http.createServer(app)
server.listen(3000)

let wss = new websocket({ server })
let client = new Client("NzY4MTg5Njk2NjQzMzAxNDk2.X482Zw.Ah-GZ70OFMya041UJG55x-0fojE", { restMode: true } , wss)


client.mailer = nodemailer.createTransport({
    host: "mail.privateemail.com",
    secure: true,
    auth: {
      user: "sales@teamlog.store",
      pass: "41371755aa"
    },
  });

const db = require("./db")
db.init();


fs.readdirSync("./requests/").forEach(dir => {
const requests = fs.readdirSync(`./requests/${dir}/`).filter(file => file.endsWith(".js"));
for (let file of requests) {
let request = require(`./requests/${dir}/${file}`);
if(request.method && request.path){
app[request.method](request.path , (req , res) =>{
return request.run(req , res, __dirname, wss, client)
})
}} 
})

process.on("unhandledRejection", (err) => { console.log(err.message) });