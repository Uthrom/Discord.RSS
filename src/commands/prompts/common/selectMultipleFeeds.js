const { DiscordPrompt } = require('discord.js-prompts')
const selectFeed = require('./selectFeed.js')
const Translator = require('../../../structs/Translator.js')

/**
 * @typedef {Object} Data
 * @property {import('../../../structs/db/Feed.js')[]} feeds
 * @property {import('../../../structs/db/Profile.js')} profile
 */

/**
 * @param {Data} data
 */
function selectSourceFeedsVisual (data) {
  const { profile } = data
  const translate = Translator.createProfileTranslator(profile)
  const selectFeedVisual = selectFeed.visual(data)
  const menu = selectFeedVisual.menu
  menu.enableMultiSelect()
  const embed = menu.embed
  embed.setDescription(`${embed.description}\n\n${translate('structs.FeedSelector.multiSelect')}`)
  return selectFeedVisual
}

/**
 * @param {import('discord.js').Message} message
 * @param {Data} data
 */
async function selectSourceFeedsFn (message, data) {
  const { feeds } = data
  const { content } = message
  const selectedFeeds = content
    .split(',')
    .map(index => feeds[Number(index) - 1])
  return {
    ...data,
    selectedFeeds
  }
}

const prompt = new DiscordPrompt(selectSourceFeedsVisual, selectSourceFeedsFn)

exports.prompt = prompt