const img = require('images-scraper');
const Discord = require('discord.js');
const google = new img({
	puppeteer: {
		headless: true,
	},
});

module.exports = {
	name: 'image',
	cooldown: 8,
	description: 'Sends a image',
	run : async (client, message, args) => {
		const query = args.join(' ');
		// console.log(query);
		if (!query) return message.channel.send('Please enter a search query');

		const random = Math.floor((Math.random() * 90) + 0);
		// console.log(random);
		const results = await google.scrape(query, 100);
		const hasil = results[random].url;
		// console.log(hasil);
		// message.channel.send('Generate Picture...');
		const embedpic = new Discord.MessageEmbed()
			.setTitle(`${query}`)
			.setImage(hasil);
		message.channel.send(embedpic);

	},
};