const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "announce",
    category: "moderation",
    aliases: ["an"],
    description : "This command use for ping and annouce the messages",
    run : async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(`:x: You don't have manage messages permissions to use this command`);
        

        let mentions;

        if(!args.length) return message.reply('> Usage: <prefix>announce <#channel> <message>');

        const channel = message.mentions.channels.first();
        if(!channel) return message.reply('Please specify a channel!');

        if(!args[1]) return message.reply('Please specify a message to announce');

        if(!args.some((val) => val.toLowerCase() === '-ping')) {
            for (let i = 0; i < args.length; i++ ) {
                if(args[i].toLowerCase() === '-ping') args.slice(i, 1);
            }

            mention = true;
        } else mention = false;

        if(mention === true) channel.send('@everyone');

        channel.send(
            new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL ({ dynamic: true}))
                .setDescription(args.slice(1).join(" "))
                .setTimestamp()
                .setColor('02DDFF')
        )
    }
}