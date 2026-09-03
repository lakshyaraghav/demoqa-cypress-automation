export const verifySubmitTableValue = (label, expectedValue) => {
    cy.contains('td', label)
        .parent('tr')
        .find('td')
        .eq(1)
        .should('have.text', expectedValue);
};

export function verifyFieldIsInvalid(getFieldFn) {
    getFieldFn().then(($el) => {
        expect($el[0].checkValidity(), 'field should be invalid').to.be.false;
    });
}