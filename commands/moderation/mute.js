const discord = require("discord.js");

module.exports = {
    name: "mute",
    aliases: ["mu"],
    category: "moderation",
    description : "This command use for mute members./If you add you server to first time create [Muted] role and desable all permission for that role!",
    run : async(client, message, args) => {
        if (!message.member.hasPermission('MANAGE_CHANNELS', 'MANAGE_MESSAGES')) {
            return message.reply(
              `:x: You don't have permissions to use this command!`
            );
          }
      
          if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
            return message.reply(`:x: You don't have permissions to use this command!`);
          }
          if(!args.length) return message.reply(`> Usage: <prefix>mute <@user> <reason>`)
          const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(
        "Please mention the member to who you want to mute"
      );
    }
 
    if(user.id === message.author.id) {
      return message.channel.send("I won't mute you -_-");
    }
    let reason = args.slice(1).join(" ")
    
    
    if(!reason) {
      return message.channel.send("Please Give the reason to mute the member")
    }
    let muterole = message.guild.roles.cache.find(x => x.name === "Muted")
    
    
      if(!muterole) {
      return message.channel.send("This server do not have role with name `Muted`")
    }
    if(user.roles.cache.has(muterole)) {
        return message.channel.send("Given User is already muted")
      }
      user.roles.add(muterole)
    
      await message.channel.send(`**${message.author.username}** is mute **${message.mentions.users.first().username}** For \`${reason}\``)
          
          user.send(`**${message.author.username}** is  muted you **${message.guild.name}** For \`${reason}\``)
    }
}