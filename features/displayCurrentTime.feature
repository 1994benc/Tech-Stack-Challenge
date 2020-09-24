Feature: Display current time

    Website visitor wants to view the current time

    Scenario: There is no error loading the current time
      Given There is no error loading the current time
      When A user loads the website
      Then The current time is displayed
