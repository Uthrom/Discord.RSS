const { DiscordPrompt } = require('discord.js-prompts')
const commonPrompts = require('../common/index.js')
const Translator = require('../../../structs/Translator.js')

/**
 * @typedef {Object} Data
 * @property {import('../../../structs/db/Feed.js')[]} feeds
 * @property {import('../../../structs/db/Profile.js')} profile
 * @property {import('../../../structs/db/Feed.js')} sourceFeed
 */

/**
 * @param {Data} data
 */
function selectDestinationFeedsVisual (data) {
  const { profile } = data
  const translate = Translator.createProfileTranslator(profile)
  const selectFeedVisual = commonPrompts.selectFeed.visual(data)
  const menu = selectFeedVisual.menu
  menu.enableMultiSelect()
  const embed = menu.embed
  embed.setDescription(`${translate('commands.clone.copyTo')}\n\n${embed.description}\n\n${translate('structs.FeedSelector.multiSelect')}`)
  return selectFeedVisual
}

/**
 * @param {import('discord.js').Message} message
 * @param {Data} data
 */
async function selectDestinationFeedsFn (message, data) {
  const { feeds } = data
  const { content } = message
  const destinationFeeds = content
    .split(',')
    .map(index => feeds[Number(index) - 1])
  return {
    ...data,
    destinationFeeds
  }
}

const prompt = new DiscordPrompt(selectDestinationFeedsVisual, selectDestinationFeedsFn)

exports.prompt = prompt
