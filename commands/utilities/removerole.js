module.exports = {
	name: 'removerole',
	description: 'Removes a role',
	permissions: 'MANAGE_ROLES',
	run : async (client, message, args) => {
		const member = message.mentions.members.first();
		if(!member) return message.reply('Mention a member.');
		const role = message.mentions.roles.first();
		if(!role) return message.channel.send('Specify a valid role.');
		member.roles.remove(role);
		message.channel.send(`Removed ${role} from ${member.user.username}`);
	},
};