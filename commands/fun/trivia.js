const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	name: 'trivia',
	description: 'Play trivia',
	run : async (client, message, args) => {
		const response = await fetch('https://opentdb.com/api.php?amount=1&category=31');
		const data = await response.json();
		const i = Math.floor(Math.random() * data.results.length);
		const randomQues = data.results[i];
		const ques = randomQues.question;
		const crtans = randomQues.correct_answer;
		message.channel.send(ques);
		const filter = m => m.author.id === message.author.id;
		try {
			const answer = await message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] });
			const ans = answer.first();
			if(ans.content.toLowerCase() === crtans.toLowerCase()) {
				message.channel.send('Correct Answer');
			}
			else {
				message.channel.send(`Wrong Answer. Correct answer: ${crtans}`);
			}
		}
		catch (err) {
			message.channel.send('Time Up!');
		}
	},
};