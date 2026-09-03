///<reference types="cypress"/>

import DialogsPage from "../pages/DialogsPage";

describe('dialogs test', () => {

    const dialogs = new DialogsPage();

    beforeEach(() => {
        dialogs.visitDialogs();
    })

    it('TC-01 Verify open and close small modal using Close and X button', () => {

        dialogs.openSmallModal();
        dialogs.verifyModalVisible();
        dialogs.elements.modalHeader().should('contain', 'Small Modal');
        dialogs.elements.smallModalBody().should('contain', 'This is a small modal. It has very less content');
        dialogs.elements.modalFooter().should('contain', 'Close');
        dialogs.closeModalWithX();
        dialogs.verifyModalClosed()
        dialogs.openSmallModal();
        dialogs.verifyModalVisible();
        dialogs.elements.modalHeader().should('contain', 'Small Modal');
        dialogs.closeSmallModal()
        dialogs.verifyModalClosed()
        dialogs.elements.showSmallModalBtn().should('be.visible').and('be.enabled');

    })

    it('TC-02 Verify open and close large modal using Close and X button', () => {
        dialogs.openLargeModal();
        dialogs.verifyModalVisible()
        dialogs.elements.modalHeader().should('contain', 'Large Modal');
        dialogs.elements.largeModalBody().should('contain', "Lorem Ipsum is simply dummy text of the printing and typesetting industry.");
        dialogs.elements.modalFooter().should('contain', 'Close');
        dialogs.closeModalWithX();
        dialogs.verifyModalClosed()
        dialogs.openLargeModal();
        dialogs.verifyModalVisible()
        dialogs.elements.modalHeader().should('contain', 'Large Modal');
        dialogs.closeLargeModal()
        dialogs.verifyModalClosed()
        dialogs.elements.showLargeModalBtn().should('be.visible').and('be.enabled');
    })

    it('TC-03 Verify modal behavior when clicking on backdrop', () => {
        dialogs.openSmallModal();
        dialogs.verifyModalVisible()
        dialogs.elements.modal().click('topLeft', { force: true });
        dialogs.verifyModalClosed();
    })

    it('TC-04  Verify Close modal using ESC key', () => {
        dialogs.openSmallModal();
        dialogs.verifyModalVisible()
        cy.get('body').type('{esc}');
        dialogs.verifyModalClosed();
        dialogs.elements.showSmallModalBtn().should('be.visible').and('be.enabled');
    })

    it('TC-05 - Verify Open Small and Large Modal sequentially', () => {

        dialogs.openSmallModal();
        dialogs.verifyModalVisible()
        dialogs.elements.modalHeader().should('contain', 'Small Modal');
        dialogs.closeModalWithX()
        dialogs.verifyModalClosed();
        dialogs.openLargeModal();
        dialogs.verifyModalVisible()
        dialogs.elements.modalHeader().should('contain', 'Large Modal');
        dialogs.elements.largeModalBody().should('contain.text', 'Lorem Ipsum is simply dummy text');
        dialogs.closeModalWithX()
        dialogs.verifyModalClosed();

    })
})