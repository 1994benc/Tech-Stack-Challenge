const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const sinon = require('sinon')
const moment = require('moment')

// TODO: Move into business logic
// TODO: Use RxJS
function fetchCurrentTime() {
  return new Promise((resolve, reject) => axios.get('http://worldtimeapi.org/api/ip').then(function (response) {
    console.log(response.data);
    resolve(response)
  })
    .catch(function (error) {
      console.log(error);
      reject(error)
    }));
}
// TODO: Move into business logic
function createTimeString(dateObject) {
  return moment(dateObject).format("HH:mm:ss")
}



Given('There is no error loading the current time', function () {
  const fakeResponse = {
    data: {
      abbreviation: 'BST',
      client_ip: '000.00.000.00',
      datetime: "2020-09-24T10:23:10.331886+01:00"
    }
  }
  // 10 seconds later is '2020-09-24T10:23:20.331886+01:00'
  sinon.stub(axios, "get").resolves(fakeResponse)

});

When('A user loads the website', async function () {
  // Write code here that turns the phrase above into concrete actions
  const timeData = await fetchCurrentTime()
  this.fetchedTimeData = timeData
  return this.fetchedTimeData
});

Then('The current time is displayed', function () {
  // Write code here that turns the phrase above into concrete actions
  const actualCurrentTime = createTimeString(new Date('2020-09-24T10:23:10.331886+01:00'))
  const fetchedCurrentTime = createTimeString(new Date(this.fetchedTimeData.data.datetime))
  return assert.strictEqual(actualCurrentTime, fetchedCurrentTime);
});
