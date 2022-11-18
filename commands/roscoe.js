const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roscoe')
        .setDescription('roscoe'),
    async execute(interaction) {
        await interaction.deferReply()
        const roscoe = new AttachmentBuilder('https://cdn.discordapp.com/attachments/688608120569725019/1039711778596212778/DFEBFF16-994A-4F27-B0E6-A931E5D833EC.jpg', { name: 'roscoe.jpg' })
        const embed = new EmbedBuilder()
            .setImage('attachment://roscoe.jpg')
        await interaction.channel.send({embeds: [embed], files: [roscoe]})
        await interaction.editReply('max is cuter tho 🥺')
    }
}