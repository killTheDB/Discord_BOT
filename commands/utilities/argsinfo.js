module.exports = {
	name: 'argsinfo',
	args: true,
	usage: 'arg1 arg2 ....',
	description: 'Shows details about arguments',
	run : async (client, msg, args) => {
		// if (!args.length) {
		// 	return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
		// }
		msg.channel.send(`Command name: ${this.name}\nArguments: ${args}`);
	},
};