module.exports = {
	name: 'addrole',
	description: 'Adds a role',
	permissions: 'MANAGE_ROLES',
	run : async (client, message, args) => {
		// const member = message.mentions.members.first();
		// if(!member) return message.reply('Mention a member.');
		// console.log(member);
		// const role = message.mentions.roles.first();
		// if(!role) return message.channel.send('Specify a valid role.');
		// console.log(role);
		// member.roles.add(role);
		// message.channel.send(`Given ${role} to ${member.user.username}`);
		const target = message.mentions.members.first();
		if(!target) return message.channel.send('No member specified');
		console.log(target);
		const role = message.mentions.roles.first();
		if(!role) return message.channel.send('No role specified');
		await target.roles.add(role);
		message.channel.send(`${target.user.username} has obtained a role`);
	},
};