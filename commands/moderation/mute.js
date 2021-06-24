const Discord = require('discord.js');
const ms = require('ms');
module.exports = {
	name: 'mute',
	description: 'Mute a member!',
	permissions: 'MANAGE_MESSAGES',
	run : async (client, message, args) => {
		const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if(!Member) return message.channel.send('Member is not found.');
		const role1 = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted');
		if(!role1) {
			try {
				message.channel.send('Muted role is not found, attempting to create muted role.');

				const muterole = await message.guild.roles.create({
					data : {
						name : 'muted',
						permissions: [],
					},
				});
				message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
					await channel.createOverwrite(muterole, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false,
					});
				});
				message.channel.send('Muted role has sucessfully been created.');
			}
			catch (error) {
				console.log(error);
			}
		}
		const role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');
		if(Member.roles.cache.has(role2.id)) return message.channel.send(`${Member.displayName} has already been muted.`);
		await Member.roles.add(role2);
		message.channel.send(`${Member.displayName} is now muted.`);
	},
};