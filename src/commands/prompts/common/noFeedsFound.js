const { DiscordPrompt } = require('discord.js-prompts')
const Translator = require('../../../structs/Translator.js')

/**
 * @typedef {Object} Data
 * @property {import('../../../structs/db/Profile.js')} [profile]
 * @property {import('../../../structs/db/Feed.js')[]} feeds
 */

/**
 * @param {Data} data
 */
function noFeedsFoundVisual (data) {
  const { locale } = data.profile || {}
  return {
    text: Translator.translate('structs.FeedSelector.noFeeds', locale)
  }
}

const prompt = new DiscordPrompt(noFeedsFoundVisual)

exports.prompt = prompt