import routes from "../support/routes";

class Formpage {

    elements = {
        firstNameInput: () => cy.get('#firstName'),
        lastNameInput: () => cy.get('#lastName'),
        emailInput: () => cy.get('#userEmail'),
        genderInput: (gen) => cy.get(`input[name='gender'][value='${gen}']`),
        mobileInput: () => cy.get('#userNumber'),
        dobInput: () => cy.get('#dateOfBirthInput'),
        dobInputMonthSelect: () => cy.get('.react-datepicker__month-select'),
        dobInputYearSelect: () => cy.get('.react-datepicker__year-select'),
        dobInputDaySelect: (day) => cy.get(`.react-datepicker__day--0${day}:not(.react-datepicker__day--outside-month)`),
        subjectsInput: () => cy.get('#subjectsInput'),
        subjectsSelectedChips: () => cy.get('.subjects-auto-complete__multi-value__label'),
        hobbiesInput: (hobby) => cy.get(`label.form-check-label`).contains(hobby).prev('input[type="checkbox"]'),
        // hobbiesInput2: () => cy.get('#hobbies-checkbox-2'),
        uploadPictureInput: () => cy.get('#uploadPicture'),
        currentAddressInput: () => cy.get('#currentAddress'),
        stateInput: () => cy.get('#state'),
        stateOption: () => cy.get('[role="option"]'),
        cityInput: () => cy.get('#city'),
        cityOption: () => cy.get('[role="option"]'),
        submitButton: () => cy.get('#submit'),
        modal: () => cy.get('.modal-content'),
        modalCloseBtn: () => cy.get('#closeLargeModal'),
    };

    visitFormPage() {
        cy.visit(routes.Form);
    }

    enterFirstname(firstName) {
        this.elements.firstNameInput().type(firstName);
    }

    enterLastname(lastName) {
        this.elements.lastNameInput().type(lastName);
    }
    enterEmail(email) {
        this.elements.emailInput().type(email);
    }
    enterGender(gen) {
        cy.log('gender value received:', gen)
        this.elements.genderInput(gen).check({ force: true });
    }
    enterMobile(mobile) {
        this.elements.mobileInput().clear().type(mobile);
    }
    enterDob(month, year, day) {
        this.elements.dobInput().click();
        this.elements.dobInputMonthSelect().select(month);
        this.elements.dobInputYearSelect().select(year);
        this.elements.dobInputDaySelect(day).click();
    }
    enterSubjects(subject) {

        subject.forEach((sub) => {
            this.elements.subjectsInput().type(sub).type('{enter}');
        })

    }

    enterHobbies(hobbies) {
        hobbies.forEach((hobby) => {
            this.elements.hobbiesInput(hobby).check({ force: true });
        })
    }

    uploadPicture(filePath) {
        this.elements.uploadPictureInput().selectFile(filePath);
    }

    enterCurrentAddress(address) {
        this.elements.currentAddressInput().type(address);
    }

    enterState(state) {
        this.elements.stateInput().click();
        this.elements.stateOption().contains(state).click();
    }

    enterCity(city) {
        this.elements.cityInput().click();
        this.elements.cityOption().contains(city).click();
    }

    fillForm(user){
        this.enterFirstname(user.firstName);
        this.enterLastname(user.lastName);
        this.enterEmail(user.email);
        this.enterGender(user.genders);
        this.enterMobile(user.mobile);
        this.enterDob(user.dob.month, user.dob.year, user.dob.day);
        this.enterSubjects(user.subjects);
        this.enterHobbies(user.hobbies);
        this.uploadPicture(user.imagePath);
        this.enterCurrentAddress(user.address);
        this.enterState(user.state);
        this.enterCity(user.city);

    }

    enterSubmit() {
        cy.removeAdBanners();
        this.elements.submitButton().click();
    }
    verifyFormValidation() {
        cy.get('.modal-content').should('not.exist');
        cy.get('#userForm').should('have.class', 'was-validated');
    }
    
    validateFormSubmit(){
        cy.get('.modal-content').should('be.visible');
        cy.get('#example-modal-sizes-title-lg').should('have.text', 'Thanks for submitting the form');
    }
}
export default Formpage;