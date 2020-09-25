const assert = require('assert');
const { Given, When, Then, After } = require('@cucumber/cucumber');
const axios = require('axios');
const sinon = require('sinon')
const moment = require('moment')


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
  this.getStubSandbox = sinon.createSandbox();
  this.getStubSandbox.stub(axios, "get").resolves(fakeResponse)
});

When('A user loads the website', async function () {
  try {
    const timeData = await DisplayTime.fetchCurrentTime()
    this.fetchedTimeData = timeData
  } catch (error) {
    this.errorMessage = error
  }
});

Then('The current time is displayed', function () {
  const actualCurrentTime = DisplayTime.createTimeString(new Date('2020-09-24T10:23:10.331886+01:00'))
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
  this.getStubSandbox.restore()
  return assert.strictEqual(actualErrorMessage, this.errorMessage);
});


After(function () {
  if (this.getStubSandbox) {
    this.getStubSandbox.restore()
  }
})
