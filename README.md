# A utility Discord bot for servers

![](https://github.com/tommymcgahee/utilitydiscordbot/workflows/Node/badge.svg)

This is a general use discord bot to manage aspects of a Discord server. 

## How it works

*Currently only supports changing nicknames* 

Use `!changenick @user <new nickname>` in any channel / bot DM. Name changes will be announced as an embed in the channel provided in [config.json](https://github.com/tommymcgahee/utilitydiscordbot/blob/master/config.json#L5). 

Additional commands should also be added to [config.json](https://github.com/tommymcgahee/utilitydiscordbot/blob/master/config.json#L4). 

Use this [discordjs guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html) to register and configure the bot inside Discord's developer portal. 

## Requirements

Discord bot is compatible with [Node.js 10, 12, 14 and 15](https://github.com/tommymcgahee/utilitydiscordbot/actions?query=workflow%3ANode). 

Dockerfile is currently hardcoded to build images for ARM v7 for compatibility with [Raspberry Pi OS Lite](https://www.raspberrypi.org/software/operating-systems/) and other 32-bit Raspberry Pi OSes. 

## Build the image

By default the image is configured for production. 

Set Discord values in [config.json](https://github.com/tommymcgahee/utilitydiscordbot/blob/master/config.json). These will be copied into the image on build.  

Build the image for ARM v7:  
`docker buildx build --platform linux/arm/v7 -t tommymcgahee/utilitydiscordbot .`

*[buildx](https://docs.docker.com/buildx/working-with-buildx/) is an experimental Docker feature that extends Docker's native build support. It is required to build ARM v7 images.*

## Run the image for production

`docker run -d tommymcgahee/utilitydiscordbot`

To run configured for production with `docker compose`:  
`docker-compose up`

## Run the image for development

To run nodemon, mount the host directory and set `NODE_ENV` to development with `docker compose`:  
`docker-compose -f docker-compose.yml -f development.yml up`

To run without `docker compose`:  
``docker run -d --env NODE_ENV=development -v `pwd`/:/home/node/app -v /home/node/app/node_modules name/project:tag``