'use strict'

const Hapi = require('hapi')
const Hoek = require('hoek')
const alexa = require('alexa-app')

const injectThen = require('inject-then')

const server = new Hapi.Server()
server.connection({ port: 3000 })

server.register(injectThen, (err) => {
  Hoek.assert(!err, err)

  console.log(`Server running at: ${server.info.uri}`)

  const app = new alexa.app('sample')

  app.dictionary = { 
    states: ['on', 'off']
  }

  app.intent('tv',
    {
      slots: { State: 'states'},
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
  
  if (module.parent) {
    server.start((err) => {
      Hoek.assert(!err, err)
    })
  }
})

module.exports = server
