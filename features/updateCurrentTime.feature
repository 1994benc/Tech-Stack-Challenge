Feature: Update the current time

  Update the current time every 10 seconds

  Scenario Outline: Update the time after the website has already been loaded
    Given The website has already been loaded
    When <second> seconds have passed since the initial page load
    Then The time or the error message should have been updated <number> times

    Examples:
      | second | number |
      | 5      | 1      |
      | 10     | 2      |
      | 30     | 4      |
      | 50     | 6      |







