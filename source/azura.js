// Libs
const { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } = require('discord-akairo')
const { IntentsBitField, Partials } = require('discord.js');
const { join } = require('path');
const { Logger } = require('tslog')

// Configuration
const { owners, prefix } = require('./config.json')
require('dotenv').config()

class Azura extends AkairoClient {
    constructor() {
        super({
            ownerID: owners
        }, {
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMessages
            ],
            partials: [
                Partials.Message,
                Partials.Channel,
                Partials.GuildMember,
                Partials.User,
            ],
            allowedMentions: {
                repliedUser: false,
                parse: []
            }
        });
        this.commandHandler = new CommandHandler(this, {
            directory: join(process.cwd(), 'commands'),
            prefix: prefix,
            ignoreCooldown: [],
            blockBots: true,
            allowMention: true,
            handleEdits: true,
            commandUtil: true
        })
        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: join(process.cwd(), 'inhibitors')
        })
        this.listenerHandler = new ListenerHandler(this, {
            directory: join(process.cwd(), 'listeners')
        })
        this.listenerHandler.setEmitters({
            commandHandler: this.CommandHandler,
            listenerHandler: this.ListenerHandler,
            inhibitorHandler: this.InhibitorHandler
        })
        this.commandHandler.useInhibitorHandler(this.InhibitorHandler)
        this.commandHandler.useListenerHandler(this.ListenerHandler)
        this.commandHandler.loadAll()
        this.listenerHandler.loadAll()
        this.inhibitorHandler.loadAll()

        this.logger = new Logger()
    }
    async login(token) {
        await super.login(token)
    }
}
new Azura().login(process.env.TOKEN)