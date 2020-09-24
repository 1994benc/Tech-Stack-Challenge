const assert = require('assert');
const { Given, When, Then, After } = require('@cucumber/cucumber');
const axios = require('axios');
const sinon = require('sinon')
const moment = require('moment')

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
// TODO: Move into business logic
function createTimeString(dateObject) {
  return moment(dateObject).format("HH:mm:ss")
}

// TODO: Move into business logic
function createErrorMessage() {
    return "Error - back soon!"
}

/** ----------------------------
 * ---------STEP--DEFINITIONS---
 * -----------------------------*/ 

Given('There is no error loading the current time', function () {
  const fakeResponse = {
    data: {
      abbreviation: 'BST',
      client_ip: '000.00.000.00',
      datetime: "2020-09-24T10:23:10.331886+01:00"
    }
  }
  // 10 seconds later is '2020-09-24T10:23:20.331886+01:00'
  this.getStubSandbox = sinon.createSandbox();
  this.getStubSandbox.stub(axios, "get").resolves(fakeResponse)
});

When('A user loads the website', async function () {
  try {
    const timeData = await fetchCurrentTime()
    this.fetchedTimeData = timeData
  } catch (error) { 
    this.errorMessage = error
  }
});

Then('The current time is displayed', function () {
  const actualCurrentTime = createTimeString(new Date('2020-09-24T10:23:10.331886+01:00'))
  const fetchedCurrentTime = this.fetchedTimeData
  this.getStubSandbox.restore()
  return assert.strictEqual(actualCurrentTime, fetchedCurrentTime);
});

Given('There is an error loading the current time', function () {
  // Stub an error 
  this.getStubSandbox = sinon.createSandbox()
  this.getStubSandbox.stub(axios, "get").rejects({ errorCode: 000, message: "Something went wrong" })
});

Then('The error message is displayed', function () {
  const actualErrorMessage = "Error - back soon!"
  return assert.strictEqual(actualErrorMessage, this.errorMessage);
});
