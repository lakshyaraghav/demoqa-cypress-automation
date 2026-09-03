import routes from "../support/routes";

class DialogsPage {

    elements = {
        showSmallModalBtn: () => cy.get('#showSmallModal'),
        showLargeModalBtn: () => cy.get('#showLargeModal'),
        modal: () => cy.get('.modal'),
        modalHeader: () => cy.get('.modal-header'),
        smallModalBody: () => cy.get('.modal-body'),
        largeModalBody: () => cy.get('.modal-body p'),
        modalFooter: () => cy.get('.modal-footer'),
        closeSmallModalBtn: () => cy.get('#closeSmallModal'),
        closeLargeModalBtn: () => cy.get('#closeLargeModal'),
        modalCloseIcon: () => cy.get('.btn-close'),

    }

    visitDialogs() {
        cy.visit(routes.dialogs);
    }

    openSmallModal() {
        this.elements.showSmallModalBtn().click();
    }

    openLargeModal() {
        this.elements.showLargeModalBtn().click();
    }
    closeModalWithX() {
        this.elements.modalCloseIcon().click();
    }
    closeSmallModal() { 
        this.elements.closeSmallModalBtn().click(); 
    }

    closeLargeModal() { 
        this.elements.closeLargeModalBtn().click(); 
    }

    verifyModalVisible(){
        this.elements.modal().should('be.visible');
    }

    verifyModalClosed(){
        this.elements.modal().should('not.exist');
    }

}
export default DialogsPage;


