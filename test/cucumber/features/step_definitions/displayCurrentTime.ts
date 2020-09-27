import * as assert from 'assert'
const { Given, When, Then, After } = require('cucumber')
import axios from 'axios'
import * as sinon from 'sinon'
import { DisplayTime } from '../../../../src/display-time/display-time'
/** ----------------------------
 * ---------STEP--DEFINITIONS---
 * -----------------------------*/

Given('There is no error loading the current time', function () {
  const fakeResponse = {
    data: {
      abbreviation: 'BST',
      client_ip: '000.00.000.00',
      datetime: '2020-09-24T10:23:10.331886+01:00',
    },
  }
  this.getStubSandbox = sinon.createSandbox()
  this.getStubSandbox.stub(axios, 'get').resolves(fakeResponse)
})

When('A user loads the website', async function () {
  this.displayTime = new DisplayTime()
  await this.displayTime.attached()
  this.displayMessage = this.displayTime.displayMessage
})

Then('The current time is displayed', function () {
  const actualCurrentTime = '10:23:10'
  this.getStubSandbox.restore()
  return assert.strictEqual(actualCurrentTime, this.displayMessage)
})

Given('There is an error loading the current time', function () {
  // Stub an error
  this.getStubSandbox = sinon.createSandbox()
  this.getStubSandbox
    .stub(axios, 'get')
    .rejects({ errorCode: 404, message: 'Something went wrong' })
})

Then('The error message is displayed', function () {
  const actualErrorMessage = 'Error - back soon!'
  this.getStubSandbox.restore()
  return assert.strictEqual(actualErrorMessage, this.displayMessage)
})

After(function () {
  if (this.getStubSandbox) {
    this.getStubSandbox.restore()
  }
  if (this.displayTime) {
    this.displayTime.detached()
  }
})
