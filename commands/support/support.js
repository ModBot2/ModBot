const { MessageEmbed } = require("discord.js");
const { category } = require("../info/Discrim");
const { description } = require("../help/help");

module.exports = {
    name: "support",
    category: "support",
    description: "show all command",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setDescription("**click [here](https://discord.gg/2U3qTQutVc) to Join `ModBot` support server**"
        )
        .setColor('#12f00e')
        
        const sembed = new MessageEmbed()
        .setDescription("**click [here](https://top.gg/bot/815772566983671839) to visit first site of `ModBot` webiste. give us Vote and Reviews you can add this bot in your servers using this link**"
        )
        .setColor('#f0e80e')
        const fembed = new MessageEmbed()
        .setDescription("**click [here](https://discord.me/modbot) to visit second site of `ModBot` webiste.**"
        )
        .setColor('#00e0e')
        const dembed = new MessageEmbed()
        .setDescription("**click [here](https://disforge.com/bot/993-modbot) to visit third site of `ModBot` webiste.**"
        )
        .setColor('#c0303')
        message.channel.send(embed)
        message.channel.send(sembed)
        message.channel.send(fembed)
        message.channel.send(dembed)

    }
}