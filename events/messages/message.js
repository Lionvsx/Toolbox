const BaseEvent = require('../../utils/structures/BaseEvent');
const openAI = require('openai');

module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('messageCreate')
    }

    async run(client, message) {
        if (!client.openConversations.get(message.channel.id)) return;

        let msgHistory = message.channel.messages.cache.map(msg => msg.author.username + ": " + msg.content)
        if (msgHistory.length > 10) msgHistory.slice(0, msgHistory.length - 10)

        if (msgHistory.length === 0) msgHistory.push(`${client.user.username}: Comment ca va salope?`)



        let stopAuthors = message.channel.messages.cache.filter(msg => !msg.author.bot).map(msg => msg.author.username)
        let stopAuthorsUnique = stopAuthors.filter(function(elem, pos) {
            return stopAuthors.indexOf(elem) === pos;
        })

        //if (!message.mentions.has(allMembers.get(client.user.id))) return;
        if (message.author.bot) return;
        let request = `Ceci est une conversation entre plusieurs personnes et une IA nommée ${client.user.username}, l'IA est extremement vulgaire et insulte tout le monde. \n\n${msgHistory.join('\n')}}`
        const response = await client.openai.createCompletion("text-davinci-001", {
            prompt: request,
            temperature: 0.9,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0.9,
            presence_penalty: 0.9,
            stop: stopAuthorsUnique
        });
        let answerArgs = response.data.choices[0].text.split(':')

        console.log(request)
        console.log(answerArgs)
        answerArgs.shift()
        let answer = answerArgs.join(':')
        if (answer) message.channel.send(answer.trim());

    }
}