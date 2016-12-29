'use strict'

const Alexa = require('alexa-app')

const AlexaPlugin = {
  register: function (server, options, next) {
    const app = new Alexa.app('barney')

    app.dictionary = {
      states: ['on', 'off']
    }

    app.intent('tv',
      {
        slots: { State: 'states' },
        utterances: [ 'to put the telly {states|State}' ]
      },
      (request, response) => {
        const state = request.slot('State')
        if (!state) { return response.say('You need to tell me to turn the telly on or off') }
        return response.say(`You asked for the telly to be turned ${state}`)
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
