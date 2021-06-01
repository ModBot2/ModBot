const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "removerole",
  aliases: ["rmrole", "-role"],
  category: "moderation",
  description: "Remove role from any user",
  run: async (client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) {
      return message.reply(`:x: You don't have Administrator permission to remove role`);
    }
    if(!args.length) return message.reply(`> Usage: <prefix>removerole <@user> <@rolename>`)
    let target = message.mentions.members.first();
    
    if(!target) return message.reply(`I am unable to find the user`)
    
    let rrole = message.mentions.roles.first();
    
    if(!rrole) return message.reply(`I am unable to find the role`)

    if(target.roles.highest.position >= message.member.roles.highest.position || message.author.id !== message.guild.owner.id) {
      return message.reply(`They have more power than you`)
    }
    if(target.id === message.author.id) return message.reply(`you cant remove you role`)
    
    let ticon = target.user.avatarURL({ dynamic: true, size: 2048 });
    let aicon = message.author.avatarURL({ dynamic: true, size: 2048 });
    
      const embed = new MessageEmbed()
      .setAuthor(target.user.username, ticon)
      .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
      .setColor("RANDOM")
      .setDescription(`${rrole} role removed from ${target}`)
      .setFooter(`Role removed by ${message.author.username}`, aicon)
      .setTimestamp()
      
      await message.channel.send(embed)
      
      target.roles.remove(rrole)
    
  }
}