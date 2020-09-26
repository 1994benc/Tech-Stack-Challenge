import * as assert from 'assert'
const { Given, When, Then, After } = require('@cucumber/cucumber')
import axios from 'axios'
import * as sinon from 'sinon'
import { DisplayTime } from '../../src/display-time/display-time'
/** ----------------------------
 * ---------STEP--DEFINITIONS---
 * -----------------------------*/

Given('the current hour is {int}', function (hour:number) {
  const fakeResponse = {
    data: {
      abbreviation: 'BST',
      client_ip: '000.00.000.00',
      datetime: `2020-09-24T${hour}:00:00.331886+01:00`,
    },
  }
  this.getStubSandbox = sinon.createSandbox()
  this.getStubSandbox.stub(axios, 'get').resolves(fakeResponse)
})

When('the time now is loaded', async function () {
  this.displayTime = new DisplayTime()
  this.displayTime.attached()
})

Then("the website's display mode is switched to the {string} mode", function (
  mode: string,
) {
  assert.strictEqual(this.displayTime.displayMode, mode)
})

After(function () {
  this.displayTime.detached()
})
