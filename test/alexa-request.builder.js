'use strict'

const basePayload = require('./request.json')
const intentPayload = require('./intent-request.json')

class AlexaRequestBuilder {

  constructor (request) {
    this.request = basePayload
    this.request.request = intentPayload
  }

  to (connection, endpoint) {
    return connection.injectThen({
      method: 'POST',
      url: endpoint,
      payload: this.request
    })
  }
}

module.exports = {
  withIntent: () => { return new AlexaRequestBuilder(intentPayload) }
}
