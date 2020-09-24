const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const sinon = require('sinon')

// TODO: Move into business logic
// TODO: Use RxJS
function fetchCurrentTime() {
  new Promise((resolve, reject) => axios.get('http://worldtimeapi.org/api/ip').then(function (response) {
    // handle success
    console.log(response.data);
    resolve(response)
  })
    .catch(function (error) {
      // handle error
      console.log(error);
      reject(error)
    }));
}

Given('There is no error loading the current time', function () {
  const fakeResponse = {
    data: {
      abbreviation: 'BST',
      client_ip: '000.00.000.00',
      datetime: '2020-09-24T10:23:10.331886+01:00'
    }
  }
  // 10 seconds later is '2020-09-24T10:23:20.331886+01:00'
  sinon.stub(axios, "get").resolves(fakeResponse)
  return fetchCurrentTime()
});

When('A user loads the website', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('The current time is displayed', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
