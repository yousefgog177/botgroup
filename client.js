const Eris = require("eris");
const axios = require("axios");
const fs = require("fs");

class Main extends Eris {
  constructor(token, options, gateway) {
    super(token, options);
    this.commands = [];
    this.cooldowns = {};
    this.gateway = gateway;

    this._loadCommands = async () => {
      let ccc = [];
      for (let dir of fs.readdirSync(__dirname + "/commands/")) {
        const commands = fs
          .readdirSync(__dirname + `/commands/${dir}/`)
          .filter(file => file.endsWith(".js"));

        let cmds = [];

        for (let file of commands) {
          let command = require(`./commands/${dir}/${file}`);
          if (command.name) {
            command.dir = dir
            cmds.push(`- ${command.name}`);
            this.commands.push(command);
          }
        }
        ccc.push(
          `${dir.charAt(0).toUpperCase() + dir.slice(1)} Commands:\n${cmds.join(
            "\n"
          )}`
        );
      }
      console.log(ccc.join("\n---------------------------------\n"));
      console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
    };
    this._loadEvents = async () => {
      const events = fs
        .readdirSync(__dirname + `/events/`)
        .filter(file => file.endsWith(".js"));

      for (let file of events) {
        let event = require(`./events/${file}`);
        let name = file.slice(0, -3);
        this.on(name.split("_").join(""), (...args) => event(this, ...args));
      }
    };

    this._handleReady = () => {
      this.on("rawWS", packet => {
        if (packet.t !== "READY") return;
        const data = packet.d.user;

        this.user = data;
        this.ready = true;
        this.emit("ready", data);
      });
    };
    this.fetchGuildPrefix = async id => {
      return "$";
    };
    this._loadEvents();
    this._handleReady();

    this.once("ready", () => {
      this._loadCommands();
    });

    this.connect();
  }
}

module.exports = Main;
