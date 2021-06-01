module.exports = {
    name : "clear",
    aliases : ["purge"],
    category: "moderation",
    description : "Clear meassages from guild!",
    run : async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(`:x: You don't have Manage messages permission to use this command`);
        if(!args.length) return message.reply(`> Usage: <prefix>clear <ammount of message delete>`)
        if(!args[0]) return message.channel.send('Please specify a number of messages to delete ranging from 1 - 99')
        if(isNaN(args[0])) return message.channel.send('Numbers are only allowed')
        if(parseInt(args[0]) > 99) return message.channel.send('The max amount of messages that I can delete is 99')
        await message.channel.bulkDelete(parseInt(args[0]) + 1)
            .catch(err => console.log(err))
        message.channel.send('Deleted ' + args[0]  + " messages.")
        .then(message => {
            message.delete({ timeout: 5000 })
          })
          .catch(console.error);
    }
}