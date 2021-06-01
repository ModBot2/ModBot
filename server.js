const { default_prefix } = require("./config.json");
require('dotenv').config();
const db =require("quick.db");
const moment = require("moment");
const discord = require("discord.js");
const client = new discord.Client({
  disableEveryone: false
});
const yts = require('yt-search')

client.queue = new Map();
client.vote = new Map();

require("./uptime.js");

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("message", async message => {
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix is \`${default_prefix}\``);
  }

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(default_prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(default_prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
});

const { GiveawaysManager } = require("discord-giveaways");
// Starts updating currents giveaways
const manager = new GiveawaysManager(client, {
    storage: "./handlers/giveaways.json",
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
client.giveawaysManager = manager;

client.on("message", async message => {
if(!message.guild) return;
  let prefix = db.get(`default_prefix${message.guild.id}`)
  if(prefix === null) prefix =default_prefix;
  
  if(!message.content.startsWith(default_prefix)) return;
 
})

client.on("ready", () => {
    client.user.setStatus("online");
    console.log("bot is now online")
});



client.on('ready', () => {
  console.log(`${client.user.username} has looged on!`)

  const arrayOfStatus = [
      `in ${client.guilds.cache.size} servers`,
      `in ${client.users.cache.size} users`,
      `Use ${default_prefix}help`,
  ];

  let index = 0;
  setInterval(() => {
      if (index === arrayOfStatus.length) index = 0;
      const status = arrayOfStatus[index];
      //console.log(status);
      client.user.setActivity(status, { type: "" }).catch(console.error)
      index++;
  }, 10000);
})
client.login(process.env.DISCORD_TOKEN);
