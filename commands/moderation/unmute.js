module.exports = {
	name : 'unmute',
	description : 'Unmute a user',
	run : async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if(!member) return message.channel.send('Member not found');

		const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

		await member.roles.remove(role);

		message.channel.send(`${member.displayName} is now unmuted`);
	},
};