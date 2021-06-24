module.exports = {
	name: 'beep',
	description: 'Beep!',
	run : async (client, message, args) => {
		message.channel.send('Boop.');
	},
};