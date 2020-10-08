const fs = require('fs'); 
const { prefix, token, commands, channel, bot_mechanic_channel } = require('./config.json');

const { Client, MessageEmbed } = require('discord.js');
const client = new Client(); 

const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const getUserFromMention = mention => {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

client.once('ready', () => {
	console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
	client.user.setActivity(`${client.guilds.cache.size} House(s)`, { type: 'WATCHING' }); 
});

client.on('message', async message => {
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
	if (!prefixRegex.test(message.content) || message.author.bot) return;
	
	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!commands.includes(command)) return;

	if (command === 'changenick') {
		if (args[0]) {
			const mentionedUser = getUserFromMention(args[0]);
			if (!mentionedUser) {
				return message.reply('Please use a proper mention if you want to set a nickname.');
			}
			console.log(mentionedUser);
			const oldNickname = message.guild.members.cache.find(user => user.id === mentionedUser.id).displayName;
			const newNickname = args.slice(1).join(" ");

			message.guild.members.cache.find(user => user.id === mentionedUser.id).setNickname(newNickname);
			
			const embed = new MessageEmbed()
			.setTitle('ATTN: A nickname has been changed')
			.setColor(0xff0000)
			.setDescription(`I, <@!${client.user.id}>, have allowed <@!${message.author.id}> to change ${oldNickname}'s (${mentionedUser.username}) nickname to ${newNickname}.`);
			// Send the embed to the same channel as the message
			// client.channels.cache.get(bot_mechanic_channel).send(embed); // bot testing channel
			client.channels.cache.get(channel).send(embed);
		}
	}
});

client.login(token);

// Docker graceful exit commands
const process = require('process');

process.on('SIGINT', function onSigint() {
	client.shutdown();
});

process.on('SIGTERM', function onSigterm() {
	client.shutdown();
});

client.shutdown = function () {
	// clean up your resources and exit 
	process.exit();
};