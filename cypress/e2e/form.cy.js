///<reference types="cypress" />
import Formpage from "../pages/FormPage";
import testdata from "../fixtures/testdata.json";
import { verifySubmitTableValue, verifyFieldIsInvalid } from "../utils/assertionHelper";

describe('Practice Form Test', () => {

    const form = new Formpage();

    beforeEach(() => {
        form.visitFormPage()
    });

    it('TC-01 Submit form with all valid mandatory + optional fields', () => {
        form.fillForm(testdata.userDetails)
        form.enterSubmit()
        form.validateFormSubmit()
        verifySubmitTableValue('Student Name', `${testdata.userDetails.firstName} ${testdata.userDetails.lastName}`);
        verifySubmitTableValue('Student Email', testdata.userDetails.email);
        verifySubmitTableValue('Gender', testdata.userDetails.genders);
        verifySubmitTableValue('Mobile', testdata.userDetails.mobile);
        verifySubmitTableValue('Date of Birth', `${testdata.userDetails.dob.day} ${testdata.userDetails.dob.month},${testdata.userDetails.dob.year}`);
        verifySubmitTableValue('Subjects', testdata.userDetails.subjects.join(', '));
        verifySubmitTableValue('Hobbies', testdata.userDetails.hobbies.join(', '));
        verifySubmitTableValue('Picture', testdata.userDetails.imagePath.split('/').pop());
        verifySubmitTableValue('Address', testdata.userDetails.address);
        verifySubmitTableValue('State and City', `${testdata.userDetails.state} ${testdata.userDetails.city}`);

    });

    it('TC-02 Submit form with only mandatory fields', () => {
        form.enterFirstname(testdata.userDetails.firstName)
        form.enterLastname(testdata.userDetails.lastName)
        form.enterGender(testdata.userDetails.genders)
        form.enterMobile(testdata.userDetails.mobile)
        form.enterSubmit()
        form.validateFormSubmit()
        verifySubmitTableValue('Student Name', `${testdata.userDetails.firstName} ${testdata.userDetails.lastName}`);
        verifySubmitTableValue('Gender', testdata.userDetails.genders);
        verifySubmitTableValue('Mobile', testdata.userDetails.mobile);

    })


    it('TC-03 Block Submit with empty mandatory fields', () => {
        form.enterSubmit()
        form.verifyFormValidation()
        form.elements.firstNameInput().should('have.attr', 'required');
        form.elements.lastNameInput().should('have.attr', 'required');
        cy.get("input[name='gender']").first().should('have.attr', 'required');
        form.elements.mobileInput().should('have.attr', 'required');
    })

    testdata.mandatoryFieldCases.forEach((testCase) => {

        it(`TC-04 should ${testCase.expected === 'pass' ? 'accept' : 'reject'} form when ${testCase.description}`, () => {

            if (testCase.firstName) form.enterFirstname(testCase.firstName);
            if (testCase.lastName) form.enterLastname(testCase.lastName);
            if (testCase.genders) form.enterGender(testCase.genders);
            if (testCase.mobile) form.enterMobile(testCase.mobile);

            form.enterSubmit();

            if (testCase.expected === 'pass') {
                form.validateFormSubmit()
            } else {
                form.verifyFormValidation()
            }
        });
    });

    it('TC-05 Rejects submission when firstName is empty', () => {
        form.enterLastname(testdata.userDetails.lastName)
        form.enterGender(testdata.userDetails.genders)
        form.enterMobile(testdata.userDetails.mobile)
        form.enterSubmit()

        form.verifyFormValidation()
        verifyFieldIsInvalid(form.elements.firstNameInput)
    })

    it('TC-06 Rejects submission when lastName is empty', () => {
        form.enterFirstname(testdata.userDetails.firstName)
        form.enterGender(testdata.userDetails.genders)
        form.enterMobile(testdata.userDetails.mobile)
        form.enterSubmit()

        form.verifyFormValidation()
        verifyFieldIsInvalid(form.elements.lastNameInput)
    })

    it('TC-07 Rejects submission when gender is not selected', () => {
        form.enterFirstname(testdata.userDetails.firstName)
        form.enterLastname(testdata.userDetails.lastName)
        form.enterMobile(testdata.userDetails.mobile)
        form.enterSubmit()

        form.verifyFormValidation()
        cy.get("input[name='gender']").first().then(($el) => {
            expect($el[0].checkValidity()).to.be.false;
        })
    })

    it('TC-08 Invalid email format', () => {
        form.enterFirstname(testdata.userDetails.firstName)
        form.enterLastname(testdata.userDetails.lastName)
        form.enterEmail(testdata.invalidData.invalidEmail)
        form.enterGender(testdata.userDetails.genders)
        form.enterMobile(testdata.userDetails.mobile)
        form.enterSubmit()

        form.verifyFormValidation()
        verifyFieldIsInvalid(form.elements.emailInput)

    })

    it('TC-09 Subjects field only accepts values from the suggestion list', () => {
        form.elements.subjectsInput().type('NotARealSubjectXYZ{enter}');
        form.elements.subjectsSelectedChips().should('not.exist');
    });

    it('BUG-1: Mobile number field accepts fewer than 10 digits (see DEFECTS.md - DEF-10)(Intentionally failing)', () => {
        form.enterFirstname(testdata.userDetails.firstName)
        form.enterLastname(testdata.userDetails.lastName)
        form.enterGender(testdata.userDetails.genders)
        form.enterMobile(testdata.invalidData.invalidMobile)
        form.enterSubmit()

        form.verifyFormValidation()
        verifyFieldIsInvalid(form.elements.mobileInput)
    });


    it('BUG-2: accepts a future Date of Birth (see DEFECTS.md - DEF-02)', () => {
        form.enterFirstname(testdata.userDetails.firstName)
        form.enterLastname(testdata.userDetails.lastName)
        form.enterGender(testdata.userDetails.genders)
        form.enterMobile(testdata.userDetails.mobile)
        form.enterDob('December', '2099', '25')
        form.enterSubmit()
    
        // expected: future DOB should be rejected
        // actual: no validation exists, form submits (known defect - DEF-02)
        cy.get('.modal-content').should('be.visible');
    })

    it('BUG-3: firstName field accepts numeric input (see DEFECTS.md - DEF-06)', () => {
        form.enterFirstname('12345')
        form.enterLastname(testdata.userDetails.lastName)
        form.enterGender(testdata.userDetails.genders)
        form.enterMobile(testdata.userDetails.mobile)
        form.enterSubmit()
    
        cy.get('.modal-content').should('be.visible');
        verifySubmitTableValue('Student Name', `12345 ${testdata.userDetails.lastName}`)
    })

    it('BUG-4: close button on submission modal does not close it (see DEFECTS.md - DEF-05)', () => {
        form.enterFirstname(testdata.userDetails.firstName)
        form.enterLastname(testdata.userDetails.lastName)
        form.enterGender(testdata.userDetails.genders)
        form.enterMobile(testdata.userDetails.mobile)
        form.enterSubmit()
    
        cy.get('.modal-content').should('be.visible');
        
        form.elements.modalCloseBtn().click();
    
        // expected: modal should close
        // actual: modal stays open (known defect - DEF-05)
        cy.get('.modal-content').should('be.visible');
    })


    it('BUG-5: City selection is not reset when State is changed (see DEFECTS.md - DEF-11)', () => {
        form.enterState('NCR');
        form.enterCity('Delhi');
        cy.get('#city').should('contain.text', 'Delhi');
    
        form.enterState('Uttar Pradesh');
        // expected: city should reset
        // actual: previous city value persists (known defect - DEF-11)
        cy.get('#city').should('contain.text', 'Delhi');
    })









});