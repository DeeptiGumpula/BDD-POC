Feature: As an android app user, I want to create my profile.

#create profile
  @android @high @smoke
  Scenario: Verify on successful profile creation, user is automatically logged in. New profile created event is shown in the timeline.
    Given I go to scanning screen
    When  I tap on History icon


