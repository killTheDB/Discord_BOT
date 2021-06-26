const Discord = require('discord.js');
const get = require('request-promise-native');
module.exports = {
	name: 'animeinfo',
	description: 'Find info about anime',
	run : async (client, message, args) => {
		if(!args.length) return message.channel.send('Specify anime name');

		const option = {
			url: `https://kitsu.io/api/edge/anime?filter[text]=${args.join(' ')}`,
			method: 'GET',
			headers: {
				'Accept': 'application/vnd.api+json',
				'Content-Type': 'application/vnd.api+json',
			},
			json: true,
		};
		message.channel.send('ok').then(msg => {
			get(option).then(mat =>{
				// console.log(mat.data[0].attributes.relationships.animeProdcutions);
				const embed = new Discord.MessageEmbed()
					.setTitle(mat.data[0].attributes.titles.en_jp)
					.setURL(`https://kitsu.io/${mat.data[0].id}`)
					.setThumbnail(mat.data[0].attributes.posterImage.original)
					.setDescription(mat.data[0].attributes.synopsis)
					.addFields({
						name: 'Type',
						value: mat.data[0].attributes.showType,
					},
					{
						name: 'Published',
						value: `${mat.data[0].attributes.startDate} to ${mat.data[0].attributes.endDate ? mat.data[0].attributes.endDate : 'N/A or Airing'}`,
					},
					{
						name: 'Status',
						value: mat.data[0].attributes.status,
					},
					{
						name: 'Episode Count',
						value: mat.data[0].attributes.episodeCount ? mat.data[0].attributes.episodeCount : 'N/A',
					},
					{
						name: 'Next Episode',
						value: mat.data[0].attributes.nextRelease ? mat.data[0].attributes.nextRelease : 'N/A',
					},
					{
						name: 'Rank',
						value: mat.data[0].attributes.ratingRank,
					},
					{
						name: 'Avg Rating',
						value: mat.data[0].attributes.averageRating,
					},
					)
					.setColor('RANDOM');
				message.channel.send(embed);
			});
		});
	},
};