const { Command } = require("discord.js-commando");

module.exports = class randomNumberCommand extends Command {
	constructor(client) {
		super(client, {
			name: "random",
			aliases: ["random-number", "number-between"],
			memberName: "random",
			group: "misc",
			description: "Generates a random number between x and y",
			args: [
				{
					key: "min",
					prompt: "What is the minimum number?",
					type: "integer",
				},
				{
					key: "max",
					prompt: "What is the maximum number?",
					type: "integer",
				},
			],
		});
	}

	run(message, { min, max }) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return message.say(Math.floor(Math.random() * (max - min + 1)) + min);
	}
};
