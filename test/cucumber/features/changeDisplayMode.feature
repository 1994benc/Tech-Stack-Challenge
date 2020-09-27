Feature: Change the display mode

  Website visitor wants to switch the display mode when it's in the evening

  Scenario Outline: it is now in the evening
    Given the current hour is <hour>
    When the current time is loaded
    Then the website's display mode is switched to the "<mode>" mode

    Examples:
      | hour | mode  |
      | 17   | day   |
      | 18   | night |
      | 23   | night |
      | 0    | night |
      | 12   | day   |
      | 11   | day   |
      | 6    | day   |
      | 5    | night |
      | 1    | night |
      | 8    | day   |
      | 10   | day   |
