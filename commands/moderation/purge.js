module.exports = {
	name: 'purge',
	cooldown: 8,
	description: 'Shows details about arguments',
	run : async (client, msg, args) => {
		const amount = parseInt(args[0]);
		if (isNaN(amount)) {
			return msg.reply('that doesn\'t seem to be a valid number.');
		}
		else if (amount < 2 || amount > 100) {
			return msg.reply('you need to input a number between 2 and 100.');
		}
		msg.channel.bulkDelete(amount + 1, true).catch(err => {
			console.error(err);
			msg.channel.send('there was an error trying to prune messages in this channel!');
		});
	},
};