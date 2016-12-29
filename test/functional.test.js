'use strict'

const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()

const describe = lab.describe
const context = lab.describe
const it = lab.it
const before = lab.before
const after = lab.after
const expect = Code.expect

const AlexaRequestBuilder = require('./alexa-request.builder')

const server = require('..')

describe('alexa-tv', () => {
  before((done) => {
    done()
  })

  after((done) => {
    done()
  })

  context('TV on reqest', () => {
    it('Turns the tv on', (done) => {
      return AlexaRequestBuilder
        .withIntent()
        .to(server, server.info.uri + '/')
        .then((output) => {
          expect(output.statusCode).to.equal(200)
          expect(output.result.response.outputSpeech.ssml).to.equal('<speak>You asked for the telly to be turned on</speak>')
        })
    })
  })
})