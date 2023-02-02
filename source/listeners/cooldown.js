const { Listener } = require('discord-akairo')
const { Message } = require('discord.js')

module.exports = class CooldownListener extends Listener {
    constructor() {
        super('cooldown', {
            event: 'cooldown',
            emitter: 'commandHandler'
        })
        this.cache = new Set()
    }
    exec(message, command, remaining) {
        if (this.cache.has(`${message.author.id}-cooldown`)) return

        this.cache.add(`${message.author.id}-cooldown`)
        setTimeout(() => {
            this.cache.delete(`${message.author.id}-cooldown`)
            return message.reactions.removeAll()
        }, 3000);
        message.react('⌛')
    }
}