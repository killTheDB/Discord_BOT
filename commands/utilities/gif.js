const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	name: 'gif',
	description: 'Send a gif',
	run : async (client, message, args) => {
		const search = args.join(' ');
		console.log(search);
		const url = `https://g.tenor.com/v1/search?q=${search}&key=${process.env.TENORKEY}&limit=8`;
		const response = await fetch(url);
		const json = await response.json();
		const i = Math.floor(Math.random() * json.results.length);
		console.log(json);
		message.channel.send(json.results[i].url);
	},
};