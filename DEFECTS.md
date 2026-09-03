# Defect Report

Found through manual exploration of https://demoqa.com/automation-practice-form, https://demoqa.com/modal-dialogs and https://demoqa.com/selectable Where feasible, a Cypress regression test
locks in the current (buggy) behavior — referenced under Evidence.

---

## DEF-01: Date of Birth field breaks UI when cleared via backspace
- Severity/Priority: Medium / Medium — breaks a core input's usability, but a workaround (re-selecting the date) exists.
- Steps: Open Practice Form → click Date of Birth → select a date → click into the field and backspace/clear the default value.
- Expected: Field should handle clearing gracefully (empty or revert to placeholder).
- Actual: UI breaks/renders incorrectly.
- Evidence: Manual reproduction. Not automated — layout-dependent, hard to assert reliably via DOM.

## DEF-02: Future Date of Birth is accepted
- Severity/Priority: Medium / Medium — data integrity/business rule violation, no security impact.
- Steps: Fill mandatory fields → set DOB to a future date (e.g. Dec 2099) → Submit.
- Expected: Submission should be blocked for a DOB in the future.
- Actual: Form submits successfully with no validation.
- Evidence: `form.cy.js` → "BUG-2: accepts a future Date of Birth".

## DEF-03: Ad banners overlap footer controls, intermittently blocking Submit
- Severity/Priority: Medium / Low-Medium — third-party ad content, not core app logic, but breaks real user flows.
- Steps: Scroll to State/City/Submit area → observe rotating ad banner (#fixedban) overlapping controls.
- Expected: Form controls always clickable.
- Actual: Clicks intermittently intercepted by ad overlay.
- Handling: `cy.removeAdBanners()` custom command strips known ad containers before Submit, rather than masking with blind force-clicks.

## DEF-04: No file type validation on picture upload
- Severity/Priority: Low / Low — cosmetic/data quality on this demo site; would be higher if a production upload pipeline processed the file.
- Steps: Click Choose File → select a .pdf → Submit.
- Expected: Only image files (jpg/png) should be accepted.
- Actual: Any file type is accepted and shown in the confirmation table.
- Evidence: Already demonstrated in `form.cy.js` → "Submit form with all valid mandatory + optional fields" (uploads a PDF, passes).

## DEF-05: Close button on the submission confirmation modal does not close it
- Severity/Priority: High / High — blocks the user from dismissing the confirmation dialog through the primary close affordance.
- Steps: Fill mandatory fields → Submit → click the close button on the confirmation modal.
- Expected: Modal closes.
- Actual: Modal remains open.
- Evidence: `form.cy.js` → "BUG-4: close button on submission modal does not close it".

## DEF-06: First Name / Last Name fields accept numeric characters
- Severity/Priority: Low / Low — input validation gap, data quality risk.
- Steps: Enter "12345" in First Name → fill remaining mandatory fields → Submit.
- Expected: Name fields should reject numeric-only input.
- Actual: Accepted and shown as the student's name in the summary.
- Evidence: `form.cy.js` → "BUG-3: firstName field accepts numeric input".

## DEF-07: No error message/toast shown when mandatory fields are invalid
- Severity/Priority: Medium / Medium — poor discoverability; user only sees red borders with no explanatory text.
- Steps: Click Submit with all mandatory fields empty.
- Expected: A toast/message should tell the user which fields need attention.
- Actual: Only a red border (was-validated class) appears, no message.
- Evidence: `form.cy.js` → "Block Submit with empty mandatory fields" confirms the block; no message-presence test exists as this is an absence-of-feature gap.

## DEF-08: State value is not shown in the summary unless City is also selected
- Severity/Priority: Low / Medium — inconsistent behavior for an optional field pairing, confusing for users who only fill State.
- Steps: Select only a State (leave City blank, both non-mandatory) → fill mandatory fields → Submit.
- Expected: State should appear in the summary table even without City.
- Actual: "State and City" row does not appear at all unless both are selected.
- Evidence: Manual reproduction.

## DEF-09: No character limit on the Current Address textarea
- Severity/Priority: Low / Low — minor data quality concern, no functional break observed.
- Steps: Paste a very long string into Current Address → Submit.
- Expected: A reasonable max-length should be enforced.
- Actual: Unlimited text accepted.
- Evidence: Manual reproduction.

## DEF-10 (Automation observation — confirmed as an app defect): Mobile field behaves differently between manual typing and Cypress `.type()`
- Severity / Priority: Medium / Medium — allows invalid mobile numbers to be submitted, resulting in incorrect data being stored.
- Expected: The form should reject the submission and display validation for the mobile number because the field requires exactly 10 digits.
- Actual: The form submits successfully and the confirmation modal is displayed even though the mobile number contains only 4 digits.
- Evidence: Cypress verifies that the input value is exactly 9778 and that the input has minlength="10" and maxlength="10". The submission still succeeds.
- Regression Test: DEF-10 - "BUG-1: Mobile number field accepts fewer than 10 digits"
- Test Status: Intentionally failing — the test asserts the expected behavior, but currently fails because the application accepts the invalid mobile number. ()

## DEF-11: City selection is not reset when State is changed
- Severity/Priority: Medium / Medium — stale/inconsistent data shown to the user after changing a dependent dropdown.
- Steps: Select State "NCR" → select City "Delhi" → change State to "Uttar Pradesh".
- Expected: City should reset/clear since it belonged to the previous State.
- Actual: "Delhi" remains selected in the City dropdown.
- Evidence: `form.cy.js` → "BUG-5: City selection is not reset when State is changed".