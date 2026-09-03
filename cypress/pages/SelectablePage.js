import routes from "../support/routes";
class SelectablePage {

    elements = {

        listTab: () => cy.get('#demo-tab-list'),
        gridTab: () => cy.get('#demo-tab-grid'),
        listitems: (item) => cy.get('#verticalListContainer li').contains(item),
        griditems: (item) => cy.get('#gridContainer li').contains(item)

    }

    listitems={
        first: "Cras justo odio",
        second: "Dapibus ac facilisis in",
        third: "Morbi leo risus",
        fourth: "Porta ac consectetur ac",
        multipleSelection: [
            "Cras justo odio",
            "Dapibus ac facilisis in",
            "Morbi leo risus",
            "Porta ac consectetur ac"
        ]
    }

    griditems={
        first: "One",
        second: "Two",
        third: "Three",
        fourth: "Four",
        fifth: "Five",
        sixth: "Six",
        seventh: "Seven",
        eighth: "Eight",
        ninth: "Nine",
        multipleSelection: [
            "One",
            "Two",
            "Three",
            "Four",
            "Five",
            "Six",
            "Seven",
            "Eight",
            "Nine"
        ]
    }

    visitSelectable(){
        cy.visit(routes.selectable);
    }

    clickListTab() {
        this.elements.listTab().click();
    }
    clickGridTab() {
        this.elements.gridTab().click();
    }

    selectListItem(item) {
        this.elements.listitems(item).click();
    }

    selectGridItem(item) {
        this.elements.griditems(item).click();
    }

   



}
export default SelectablePage;