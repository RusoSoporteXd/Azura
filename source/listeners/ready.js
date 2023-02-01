const { Listener } = require('discord-akairo')

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

        this.client.logger.debug(`Logged as ${this.client.user.tag}`)
    }
}