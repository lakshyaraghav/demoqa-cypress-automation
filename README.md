# DemoQA Cypress Automation

Cypress test suite for [demoqa.com](https://demoqa.com), covering three pages:
- Practice Form (`/automation-practice-form`)
- Modal Dialogs (`/modal-dialogs`)
- Selectable List/Grid (`/selectable`)

## Prerequisites

- Node.js 18 or newer
- npm
- Internet access (tests run against the live demoqa.com site)

## Install 
# run this command first for Install all project dependencies:
npm install

## Run the tests

# Run everything, headless (this is the single command for the whole suite)
npm test

# Run everything with the browser visible
npm run test:headed

# Open the interactive Cypress runner (pick specs one at a time, watch them live)
npm run test:open


# Where to see the results

- Terminal output after `npm test` shows a pass/fail count for each spec file and the whole run.
- Videos of every run are saved to `cypress/videos/`.
- Screenshots are only generated automatically when a test fails, saved to `cypress/screenshots/`.

## Project structure

cypress/
  e2e/                     Test specs (one file per page)
    dialogs.cy.js
    form.cy.js
    selectable.cy.js
  pages/                   Page Object classes - all selectors and actions live here
    DialogsPage.js
    FormPage.js
    SelectablePage.js
  fixtures/                Test data
    testData.json
    testDemoFiles/         Sample file used for the picture upload test
  support/
    commands.js            Custom Cypress commands
    e2e.js                 Global setup (imports commands, handles known ad-script errors)
    routes.js              Centralized page URLs
  utils/
    assertionHelper.js     Shared assertion helpers used across specs
cypress.config.js          baseUrl, timeouts, retries
package.json
DEFECTS.md                 Bugs found during testing
REPORT.md                  1-page summary of approach and results


## How the tests are organized

Each page has its own Page Object (`pages/`) that owns every selector and exposes readable action methods, for example:

```javascript
form.enterFirstname('John')
form.fillForm(testdata.userDetails)
form.validateFormSubmit()
```

The specs (`e2e/`) call these methods and add assertions - they don't touch raw selectors directly. This keeps the tests readable and means a DOM change on demoqa.com only needs a fix in one place.

## Data-driven tests

The mandatory-field validation on the Practice Form is tested with a single loop over a list of scenarios in `fixtures/testData.json` (`mandatoryFieldCases`), instead of copy-pasting a near-identical test for each field. Adding a new scenario is just adding a new object to that array.

## Flakiness we ran into and how we handled it

demoqa.com shows rotating ad banners that occasionally sit on top of form controls (mainly around the Submit button and the State/City dropdowns) and block clicks. Instead of masking this with blind `force: true` clicks everywhere, we added a custom command `cy.removeAdBanners()` (`support/commands.js`) that strips the known ad containers from the page right before we interact with the affected area. This is called from `enterSubmit()` in the Page Object. It's also logged as a defect (DEF-03 in DEFECTS.md) since it's a real usability issue, not just a test problem.

We also saw the ad scripts occasionally throw their own JavaScript errors, unrelated to the app itself `support/e2e.js` filters out only those specific known ad-related errors so a real bug in the app under test still fails the test as expected.

## Known limitations

- Tests run against the live public demoqa.com site, so results depend on that site being up and its ad scripts not changing.
- A few defects found manually (see DEFECTS.md) were not automated becausethey're hard to assert reliably through the DOM (e.g. visual layout glitches) - these are documented instead.