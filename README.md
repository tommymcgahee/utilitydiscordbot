# A utility Discord bot for servers

![](https://github.com/tommymcgahee/utilitydiscordbot/workflows/Node/badge.svg)

This is a general use discord bot to manage aspects of a Discord server.

## How it works

*Currently only supports changing nicknames* 

Use `!changenick @user <new nickname>` in any channel / bot DM. Name changes will be announced as an embed in the channel provided in [config.json](https://github.com/tommymcgahee/utilitydiscordbot/blob/master/config.example.json#L5). 

Additional commands should also be added to [config.json](https://github.com/tommymcgahee/utilitydiscordbot/blob/master/config.example.json#L4). 

Use this [discordjs guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html) to register and configure the bot inside Discord's developer portal. 

## Requirements

Currently compatible with [Node.js 10, 12, 14 and 15](https://github.com/tommymcgahee/utilitydiscordbot/actions?query=workflow%3ANode). 

## Docker Requirements

`Docker Compose` is recommended but not required. 

To run nodemon and set `NODE_ENV` to development:  
`docker-compose -f docker-compose.yml -f development.yml up`

To build for production:  
`docker-compose up`