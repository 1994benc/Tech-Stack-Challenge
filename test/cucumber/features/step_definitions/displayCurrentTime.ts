import * as assert from 'assert';
const { Given, When, Then, After } = require('cucumber');
import axios from 'axios';
import * as sinon from 'sinon';
import { TimeModel } from '../../../../dist/displayTime/TimeModel';
import { TimeProvider } from '../../../../dist/displayTime/TimeProvider';
import { DisplayTimeComponent } from '../../../../dist/displayTime/DisplayTimeComponent';

//  Actual current time 
const EXPECTED_TIME_ISO = '2020-09-24T10:23:10.331886+01:00';
const EXPECTED_TIME_DISPLAY = '10:23:10';
const EXPECTED_ERROR_MESSAGE = 'Error - back soon!';


Given('There is no error loading the current time', function () {
  this.getStubSandbox = sinon.createSandbox();
  this.timeProvider = new TimeProvider();
  this.getStubSandbox
    .stub(this.timeProvider, 'getTime')
    .resolves(new TimeModel(new Date(EXPECTED_TIME_ISO)));
});

When('A user loads the website', async function () {
  this.displayTime = new DisplayTimeComponent(this.timeProvider);
  await this.displayTime.attached();
  this.displayMessage = this.displayTime.displayMessage;
});

Then('The current time should be displayed', function () {
  this.getStubSandbox.restore();
  return assert.strictEqual(this.displayMessage, EXPECTED_TIME_DISPLAY);
});

Given('There is an error loading the current time', function () {
  // Stub an error
  this.timeProvider = new TimeProvider();
  this.getStubSandbox = sinon.createSandbox();
  this.getStubSandbox
    .stub(this.timeProvider, 'getTime')
    .rejects({ errorCode: 404, message: 'Something went wrong' });
});

Then('The error message should be displayed', function () {
  this.getStubSandbox.restore();
  return assert.strictEqual(this.displayMessage, EXPECTED_ERROR_MESSAGE);
});

After(function () {
  if (this.getStubSandbox) {
    this.getStubSandbox.restore();
  }
  if (this.displayTime) {
    this.displayTime.detached();
  }
});
