Feature: Update the current time

    Update the current time every 10 seconds

    Scenario: The current time has already been successfully updated
      Given there is no error loading the time
      And the time has been loaded successfully
      When 10 seconds have past
      Then The current time is displayed


