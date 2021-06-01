const discord = require("discord.js");

module.exports = {
  name: "kick",
  category: "moderation",
  description: "kick anyone with one shot whithout knowing anyone xD",
  usage: "kick <@user> <reason>",
  run: async (client, message, args) => {
    
    const target = message.mentions.members.first()
    
    const reason = args.slice(1).join(" ")
    
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply(`:x: You don't have Kick members permission to use this command`)
    
    if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply(`:x: You don't have Kick members permission to use this command`)
    if(!args.length) return message.reply(`> Usage: <prefix>kick <@user> <reason>`)
    
    if(!args[0]) return message.reply(`Please mention someone to kick`)
    
    if(!target) return message.reply(`I can't find that member`)
    
    if(target.roles.highest.position >= message.member.roles.highest.position || message.author.id !== message.guild.owner.id) {
      return message.reply(`They have more power than you`)
    }
    
    if(target.id === message.author.id) return message.reply(`I can't kick you as you are the Boss`)
    
    if(target.kickable) {
      let embed = new discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`kickned \`${target.user.username}\` reason is \`${reason || "No Reason Provided"}\``)
      
      message.channel.send(embed)
      
      target.kick()
      
      message.delete()
      
    } else {
      return message.reply(`I can't kick them, make sure that my role is above of theirs`)
    }
    return undefined
  }
};