const assert = require('assert');
const { Given, When, Then, After, AfterAll } = require('@cucumber/cucumber');
const axios = require('axios');
const sinon = require('sinon')
const moment = require('moment')
var FakeTimers = require("@sinonjs/fake-timers");

/** ----------------------------
 * ---------STEP--DEFINITIONS---
 * -----------------------------*/

Given('The website has already been loaded', async function () {
  this.countSandbox = sinon.createSandbox()
  this.getSpy = this.countSandbox.spy(DisplayTime, "fetchCurrentTime")
  // When the website is loaded, the API is called
  return await DisplayTime.fetchCurrentTime()
});

When('{int} seconds have passed since the initial page load', async function (second) {
  // <second> seconds later
  this.clock = FakeTimers.install();
  DisplayTime.automaticReload()
  this.clock.tick(second * 1000)
  this.clock.uninstall();
});


Then('The time or the error message should have been updated {int} times', function (expectedCount) {
  // Count the number of function calls
  assert.strictEqual(this.getSpy.callCount, expectedCount)
});

After(function () {
  if (this.countSandbox) {
    this.countSandbox.restore()
  }
})
