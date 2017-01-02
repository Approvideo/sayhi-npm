import logger from "../util/logger"

export default class {
  constructor(gcClient, modulesHandler) {
    this._gcClient = gcClient
  }

  getPhraseId(token, botId, phrase) {
    logger.debug(`Getting phrase: ${phrase} for bot: ${botId}..`)

    const query = {
      query: `
        query {
          Bot(id: "${botId}") {
            phrases(filter: {phrase: "${phrase}"}) {
              id
            }
          }
        }`,
      token: token
    }

    return this._gcClient.query(query)
      .then(response => {
        const phrase = response.Bot.phrases[0]
        return phrase.id
      })
      .catch(error => {
        throw new Error(`Error getting phrase: ${phrase} for bot: ${botId}. -- ${JSON.stringify(error)}`)
      })
  }
}
