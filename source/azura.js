// Libs
const { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } = require('discord-akairo')
const { Intents } = require('discord.js');
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
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES
            ],
            partials: [
                "MESSAGE",
                "USER",
                "CHANNEL",
                "GUILD_MEMBER"
            ],
            allowedMentions: {
                parse: []
            }
        });
        this.commandHandler = new CommandHandler(this, {
            directory: join(process.cwd(), 'source', 'commands'),
            prefix: prefix,
            ignoreCooldown: [],
            blockBots: true,
            allowMention: true,
            handleEdits: true,
            commandUtil: true
        })
        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: join(process.cwd(), 'source', 'inhibitors')
        })
        this.listenerHandler = new ListenerHandler(this, {
            directory: join(process.cwd(), 'source', 'listeners')
        })
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            inhibitorHandler: this.inhibitorHandler
        })
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler)
        this.commandHandler.useListenerHandler(this.listenerHandler)
        this.commandHandler.loadAll()
        this.listenerHandler.loadAll()
        this.inhibitorHandler.loadAll()

        this.logger = new Logger({
            exposeStack: false,
            displayFunctionName: false,
            displayInstanceName: false,

            dateTimePattern: 'year-day-month hour:minute',
            displayFilePath: 'displayAll'
        })
    }
    async login(token) {
        await super.login(token)
    }
}
new Azura().login(process.env.TOKEN)