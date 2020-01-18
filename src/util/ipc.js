class IPC {
  /**
   * This should only be used in child processes.
   * @param {string} type
   * @param {Object<string, any>} data
   * @param {boolean} _loopback
   */
  static send (type, data, _loopback = false) {
    process.send({
      _drss: true,
      _loopback,
      type,
      data
    })
  }

  /**
   * If the message is valid for Discord.RSS
   * @param {Object<string, any>} message
   * @returns {boolean}
   */
  static isValid (message) {
    return message._drss === true
  }

  /**
   * If the message loops back to the clients
   * @param {Object<string, any>} message
   * @returns {boolean}
   */
  static isLoopback (message) {
    return message._loopback === true
  }

  /**
   * Send a message to a channel that could be on any client
   * @param {string} channel - Channel ID
   * @param {string} message - Message to send
   */
  static sendChannelMessage (channel, message) {
    this.send(this.TYPES.SEND_CHANNEL_MESSAGE, {
      channel,
      message,
      alert: true
    }, true)
  }

  /**
   * Send a message to a user that could be on any client
   * @param {string} user - User ID
   * @param {string} message - Message to send
   */
  static sendUserMessage (user, message) {
    this.send(this.TYPES.SEND_USER_MESSAGE, {
      user,
      message
    }, true)
  }

  static get TYPES () {
    return {
      KILL: 'kill',
      SHARD_READY: 'shardReady',
      INIT_COMPLETE: 'initComplete',
      SCHEDULE_COMPLETE: 'scheduleComplete',
      START_INIT: 'startInit',
      FINISHED_INIT: 'finishedInit',
      RUN_SCHEDULE: 'runSchedule',
      STOP_CLIENT: 'stopClient',
      SEND_CHANNEL_MESSAGE: 'sendChannelMessage',
      SEND_USER_MESSAGE: 'sendUserMessage'
    }
  }
}

module.exports = IPC