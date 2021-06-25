const Discord = require('discord.js');
const client = new Discord.Client();
// const keepAlive = require('./server');
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

	if (msg.content === 'p!ping') {
		const time = Date.now();
		const ping = time - msg.createdTimestamp;
		msg.channel.send(`*Bot Ping:* ${ping}\n*API Ping:* ${msg.client.ws.ping}`);
	}
});

client.on('message', (message) => {
	if (message.content.toLowerCase().startsWith('p!eval')) {
		// const owner = ['739495915982946427', '564853227393122307', '639272038560956440'] ;
		const owner = ['639272038560956440', '851866524176220241'];


		if (!owner.includes(message.author.id)) return message.channel.send('no perm');
		try {
			const result = message.content.split(' ').slice(1).join(' ');
			console.log(result);
			// console.log(typeof (message.author.id));
			message.channel.send(eval(result));
			// message.channel.send(evalved);
			// message.channel.send((evalved));
		}
		finally {
			console.log('a');
		}
	}
});

client.login('NzU2MzY2NDU5OTUyODI0MzIx.X2QzKA.9U8ffQGl6GehYRZQyyBPsPyXEP0');