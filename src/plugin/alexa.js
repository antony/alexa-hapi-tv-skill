'use strict'

const Alexa = require('alexa-app')

const AlexaPlugin = {
  register: function (server, options, next) {
    const app = new Alexa.app('sample')

    app.dictionary = {
      states: ['on', 'off']
    }

    app.intent('tv',
      {
        slots: { State: 'states' },
        utterances: [ 'turn the tv {states|State}' ]
      },
      (request, response) => {
        const state = request.slot('State')
        response.say(`You asked for the tv to be turned ${state}`)
      }
    )

    server.route({
      method: 'POST',
      path: '/',
      handler: function (request, reply) {
        app.request(request.payload)
        .then((response) => {
          reply(response)
        })
      }
    })

    next()
  }
}

AlexaPlugin.register.attributes = {
  name: 'alexa',
  version: '1.0.0'
}

module.exports = AlexaPlugin