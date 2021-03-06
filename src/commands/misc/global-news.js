const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const newsAPI = process.env.NEWS_API;
const { Command } = require("discord.js-commando");

module.exports = class globalNewsCommand extends Command {
	constructor(client) {
		super(client, {
			name: "global-news",
			aliases: ["world-news"],
			group: "misc",
			memberName: "global-news",
			description: "Sends the latest 5 global news headlines Sources: reuters",
			throttling: {
				usages: 2,
				duration: 10,
			},
		});
	}

	async run(message) {
		try {
			const response = await fetch(
				`https://newsapi.org/v2/top-headlines?sources=reuters&pageSize=5&apiKey=${newsAPI}`
			);
			const json = await response.json();
			const articleArr = json.articles;
			let processArticle = article => {
				const embed = new MessageEmbed()
					.setColor("#FF4F00")
					.setTitle(article.title)
					.setURL(article.url)
					.setAuthor(article.author)
					.setDescription(article.description)
					.setThumbnail(article.urlToImage)
					.setTimestamp(article.publishedAt)
					.setFooter("---------------------------------");
				return embed;
			};
			async function processArray(array) {
				for (const article of array) {
					const msg = await processArticle(article);
					message.say(msg);
				}
			}
			await processArray(articleArr);
		} catch (e) {
			message.say("Something failed along the way");
			return console.error(e);
		}
	}
};
// The news api is powered by NewsAPI.org!
