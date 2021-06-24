const Discord = require('discord.js');

module.exports = {
	name: 'unban',
	guildOnly: true,
	permissions: 'BAN_MEMBERS',
	description: 'Unban user from guild',
	run : async (client, msg, args) => {
		let reason = args.slice(1).join(' ');
		const userId = args[0];

		if(!reason) reason = 'No reason given';
		if(!userId) return msg.channel.send('Provide ID to unban.');
		if(isNaN(userId)) return msg.channel.send('Provide vaild ID');

		msg.guild.fetchBans().then(async bans => {
			if(bans.size === 0) return msg.channel.send('No one is banned from here');
			const bannedUser = bans.find(ban => ban.user.id == userId);
			if(!bannedUser) return msg.channel.send('This User is not banned.');
			await msg.guild.members.unban(bannedUser.user, reason).catch((err) => {
				return msg.channel.send('Something went wrong');
			}).then(() =>{
				msg.channel.send(`${userId} is unbanned.`);
			});
		});
	},
};
