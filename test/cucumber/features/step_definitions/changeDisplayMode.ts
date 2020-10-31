import * as assert from 'assert';
const { Given, When, Then, After } = require('cucumber');
import * as sinon from 'sinon';
import { TimeModel } from '../../../../dist/displayTime/TimeModel';
import { TimeProvider } from '../../../../dist/displayTime/TimeProvider';
import { DisplayTimeComponent } from '../../../../dist/displayTime/DisplayTimeComponent';

Given('the current hour is {int}', function (hour: number) {
  this.getStubSandbox = sinon.createSandbox();
  this.timeProvider = new TimeProvider();
  let date = new Date();
  date.setHours(hour);
  this.getStubSandbox
    .stub(this.timeProvider, 'getTime')
    .resolves(new TimeModel(date));
});

When('the current time is loaded', async function () {
  this.displayTime = new DisplayTimeComponent(this.timeProvider);
  await this.displayTime.attached();
});

Then(
  "the website's display mode should be switched to the {string} mode",
  function (mode: string) {
    assert.strictEqual(this.displayTime.isDayLight, mode === 'day');
  },
);

After(function () {
  if (this.displayTime) {
    this.displayTime.detached();
  }
});
