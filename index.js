'use strict'

const Hapi = require('hapi')
const Hoek = require('hoek')

const injectThen = require('inject-then')
const alexaPlugin = require('./src/plugin/alexa')

const server = new Hapi.Server()
server.connection({ port: process.env.PORT || 3000 })

server.register([
  injectThen,
  alexaPlugin
], (err) => {
  Hoek.assert(!err, err)

  console.log(`Server running at: ${server.info.uri}`)

  if (module.parent) {
    server.start((err) => {
      Hoek.assert(!err, err)
    })
  }
})

module.exports = server
