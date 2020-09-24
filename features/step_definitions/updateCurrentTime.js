const assert = require('assert');
const { Given, When, Then, After, AfterAll } = require('@cucumber/cucumber');
const axios = require('axios');
const sinon = require('sinon')
const moment = require('moment')
var FakeTimers = require("@sinonjs/fake-timers");


/** ------------------------------------
 * ---------BUSINESS LOGIC PLACEHOLDER---
 * ------------------------------------*/
// TODO: Move into business logic
// TODO: Use RxJS
function fetchCurrentTime() {
  return new Promise((resolve, reject) => axios.get('http://worldtimeapi.org/api/ip').then(function (response) {
    resolve(createTimeString(new Date(response.data.datetime)))
    
  })
    .catch(function (error) {
      reject(createErrorMessage())
     
    }));
}
function createTimeString(dateObject) {
  return moment(dateObject).format("HH:mm:ss")
}

function createErrorMessage() {
  return "Error - back soon!"
}

function automaticReload(){
  setInterval(async ()=>{
    await this.fetchCurrentTime()
  }, 1000*10)
}

DisplayTime = {
  fetchCurrentTime,
  automaticReload
}

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
