const { DiscordPrompt } = require('discord.js-prompts')
const selectMultipleFeeds = require('../common/selectMultipleFeeds.js')
const createLogger = require('../../../util/logger/create.js')

/**
 * @typedef {Object} Data
 * @property {import('../../../structs/db/Feed.js')[]} feeds
 * @property {import('../../../structs/db/Profile.js')} profile
 */

/**
 * @param {Data} data
 */
async function selectRemoveFeedsVisual (data) {
  return selectMultipleFeeds.visual(data)
}

/**
 * @param {import('discord.js').Message} message
 * @param {Data} data
 */
async function selectRemoveFeedsFn (message, data) {
  const newData = await selectMultipleFeeds.fn(message, data)
  const { selectedFeeds } = newData
  const { author, client } = message
  const log = createLogger(client.shard.ids[0])
  await Promise.all(selectedFeeds.map(f => f.delete()))
  log.info({
    guild: message.guild,
    user: author
  }, 'Removed all feeds')
  return newData
}

const prompt = new DiscordPrompt(selectRemoveFeedsVisual, selectRemoveFeedsFn)

exports.prompt = prompt