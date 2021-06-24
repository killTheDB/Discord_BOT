module.exports = {
	name: 'serverinfo',
	description: 'Shows details about server',
	run : async (client, msg, args) => {
		// console.log(msg);
		const { guild } = msg;
		const { owner } = guild;
		// console.log(owner);
		const Discord = require('discord.js');
		// msg.channel.send(` This server's name is: ${msg.guild.name}\n Total members: ${msg.guild.memberCount}\n Server Created on: ${msg.guild.createdAt}\n Server Region: ${msg.guild.region}\n Server Owner: ${owner.user.tag}`);
		const embed = new Discord.MessageEmbed()
			.setTitle(`Server Name: ${msg.guild.name}`)
			.setColor('RANDOM')
			.setThumbnail(msg.guild.iconURL({ dynamic: true }))
			.setDescription(`**Total members:** ${msg.guild.memberCount}\n**Server Created on:** ${msg.guild.createdAt}\n**Server Region:** ${msg.guild.region}\n**Server Owner:** ${owner.user.tag}`);

		msg.channel.send(embed);
	},
};