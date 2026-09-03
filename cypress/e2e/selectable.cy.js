///<reference types="cypress"/>

import SelectablePage from "../pages/SelectablePage"

describe('selectable test', () => {

    const selectablePage = new SelectablePage();

    beforeEach(() => {
        selectablePage.visitSelectable();
    })


    it('TC-01 Verify select and deselect a single item in List tab', () => {

        selectablePage.selectListItem(selectablePage.listitems.first)
        selectablePage.elements.listitems(selectablePage.listitems.first).should('have.class', 'active');
        selectablePage.selectListItem(selectablePage.listitems.first)
        selectablePage.elements.listitems(selectablePage.listitems.first).should('not.have.class', 'active');

    })

    it('TC-02 Verify select and deselect multiple items in List tab', () => {

        selectablePage.listitems.multipleSelection.forEach((i) => {
            selectablePage.selectListItem(i)
            selectablePage.elements.listitems(i).should('have.class', 'active');
        })
        selectablePage.listitems.multipleSelection.forEach((i) => {
            selectablePage.selectListItem(i)
            selectablePage.elements.listitems(i).should('not.have.class', 'active');
        })
    })

    it('TC-03 Verify select multiple items in List and switch select item in Grid tab', () => {

        selectablePage.selectListItem(selectablePage.listitems.first)
        selectablePage.selectListItem(selectablePage.listitems.second)
        selectablePage.elements.listitems(selectablePage.listitems.first).should('have.class', 'active');
        selectablePage.elements.listitems(selectablePage.listitems.second).should('have.class', 'active');

        selectablePage.clickGridTab()
        selectablePage.selectGridItem(selectablePage.griditems.first)
        selectablePage.selectGridItem(selectablePage.griditems.second)
        selectablePage.selectGridItem(selectablePage.griditems.fifth)
        selectablePage.elements.griditems(selectablePage.griditems.first).should('have.class', 'active');
        selectablePage.elements.griditems(selectablePage.griditems.second).should('have.class', 'active');
        selectablePage.elements.griditems(selectablePage.griditems.fifth).should('have.class', 'active');
    })

    it('TC-04 Verify select and deselect a multiple item in Grid tab', () => {

        selectablePage.clickGridTab()
        selectablePage.griditems.multipleSelection.forEach((i) => {
            selectablePage.selectGridItem(i)
            selectablePage.elements.griditems(i).should('have.class', 'active');
        })
        selectablePage.griditems.multipleSelection.forEach((i) => {
            selectablePage.selectGridItem(i)
            selectablePage.elements.griditems(i).should('not.have.class', 'active');
        })
    })

    it('TC-05 Verify preserve List selection after switching to Grid and back', () => {
        selectablePage.selectListItem(selectablePage.listitems.first)
        selectablePage.elements.listitems(selectablePage.listitems.first).should('have.class', 'active');


        selectablePage.clickGridTab()
        selectablePage.selectGridItem(selectablePage.griditems.second)
        selectablePage.elements.griditems(selectablePage.griditems.second).should('have.class', 'active');

        // Switch back to List tab and verify selections
        selectablePage.elements.listTab().click();
        selectablePage.elements.listitems(selectablePage.listitems.first).should('have.class', 'active');
    })

    it('TC-06 Verify preserve Grid selection after switching to List and back', () => {
        selectablePage.clickGridTab()
        selectablePage.selectGridItem(selectablePage.griditems.third)
        selectablePage.elements.griditems(selectablePage.griditems.third).should('have.class', 'active');

        selectablePage.clickListTab()
        selectablePage.selectListItem(selectablePage.listitems.second)
        selectablePage.elements.listitems(selectablePage.listitems.second).should('have.class', 'active');

        // Switch back to Grid tab and verify selections
        selectablePage.clickGridTab();
        selectablePage.elements.griditems(selectablePage.griditems.third).should('have.class', 'active');
    })

    it('TC-07 Verify all List items are visible and correctly labeled', () => {
        selectablePage.listitems.multipleSelection.forEach((item => {
            selectablePage.elements.listitems(item).should('be.visible').and('have.text', item);
        }))
    })

    it('TC-08 Verify all Grid items are visible and correctly labeled', () => {
        selectablePage.clickGridTab()
        selectablePage.griditems.multipleSelection.forEach((item => {
            selectablePage.elements.griditems(item).should('be.visible').and('have.text', item)
        }))
    })
})