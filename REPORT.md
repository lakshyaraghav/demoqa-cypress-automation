# Summary Report

## Approach

I picked three demoqa.com pages that between them cover the assignment's suggested areas - forms, selections, and dialogs:

- **Practice Form** - text inputs, radio buttons, checkboxes, a date picker,a searchable multi-select, a file upload, and two dependent dropdowns(State/City). This is the most complex page and gets the most test coverage.

- **Modal Dialogs** - opening/closing modals through different methods(X button, Close button, clicking the backdrop, pressing Escape).

- **Selectable** - single/multi selection in a list and a grid, and whether selections survive switching tabs.

Each page has its own Page Object that owns all selectors and exposes small, named action methods (`enterFirstname()`, `openSmallModal()`, `selectGridItem()`, etc.), so the specs themselves read like a script of user actions rather than raw CSS queries.

## Key design decisions

- **Centralized routes** (`support/routes.js`) instead of hardcoded URL strings in every `cy.visit()` call.

- **Data-driven mandatory-field tests** - six scenarios (valid, and five different ways a mandatory field can be missing/invalid) run from a single loop over fixture data, rather than six near-duplicate test blocks.

- **Reusable assertion helpers** (`utils/assertionHelper.js`) - `verifySubmitTableValue()` and `verifyFieldIsInvalid()` are used across many tests instead of repeating the same DOM-querying logic everywhere.

- **A custom command for a real usability problem** - demoqa's ad banners overlap form controls. `cy.removeAdBanners()` removes them before interacting with the affected area, instead of hiding the issue with forced clicks.

## Test results

       Spec                                              Tests  Passing  Failing  Pending  Skipped  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  dialogs.cy.js                            00:27        5        5        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✖  form.cy.js                               02:04       19       18        1        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  selectable.cy.js                         01:27        8        8        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✖  1 of 3 failed (33%)                      04:00       32       31        1        -        -  

A sample terminal run and Cypress-generated videos are included as artifacts. Screenshots are auto-captured for any failing test.

## Flakiness observed

The main source of flakiness on this site is the rotating ad banner near the bottom of the Practice Form, which can sit on top of the Submit button and the State/City dropdowns. This is handled with a custom command that removes known ad containers before those interactions (see README for details), and it's also logged as a defect since it's a genuine issue for real users, not just for automation.

## Defects found

11 issues were found through manual and automated exploration, documented in `DEFECTS.md` with steps to reproduce, expected vs. actual behavior, and severity/priority. Where practical, a Cypress test locks in the current (buggy) behavior as a regression check - for example, the confirmation modal's close button not working, City not resetting when State changes, and the form accepting a future date of birth.

## Trade-offs and things I'd do differently with more time

- A few minor/cosmetic issues (character limit on the address field, layout glitch when clearing the date field) were documented but not automated, since they're either low-impact or hard to assert reliably through the DOM. I prioritized automating the defects that affect core functionality.


## Recommendations for next steps

- **CI/CD**: run `npm test` on every push via GitHub Actions, upload
  `cypress/screenshots` and `cypress/videos` as build artifacts so failures
  are easy to inspect without re-running locally.
