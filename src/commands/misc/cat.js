const fetch = require("node-fetch");
const { Command } = require("discord.js-commando");

const tenorAPI = process.env.TENOR_API;

module.exports = class catCommand extends Command {
	constructor(client) {
		super(client, {
			name: "cat",
			aliases: ["cat-pic", "cats"],
			group: "misc",
			memberName: "cat",
			description: "Responds with a random Cat image",
			throttling: {
				usages: 2,
				duration: 10,
			},
		});
	}

	run(message) {
		fetch(`https://api.tenor.com/v1/random?key=${tenorAPI}&q=cat&limit=1`)
			.then(res => res.json())
			.then(json => message.say(json.results[0].url))
			.catch(e => {
				message.say("Request to find a kitty failed :(");
				return console.error(e);
			});
	}
};
