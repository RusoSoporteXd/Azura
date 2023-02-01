const { Listener } = require('discord-akairo')
const { green } = require('colors')

module.exports = class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        })
    }

    exec() {
        this.client.logger.debug(`Loaded ${this.client.listenerHandler.modules.size} listeners.`)
        this.client.logger.debug(`Loaded ${this.client.inhibitorHandler.modules.size} inhibitors.`)
        this.client.logger.debug(`Loaded ${this.client.commandHandler.modules.size} commands.`)

        console.log(green('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'))
        this.client.logger.debug(`Logged as ${this.client.user.tag}::${this.client.user.id}.`)
    }
}