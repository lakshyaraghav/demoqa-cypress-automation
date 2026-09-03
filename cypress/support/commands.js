

//Custom command for remove banners on page(see DEFECTS.md - DEF-03)
Cypress.Commands.add('removeAdBanners', () => {
    const adSelectors = ['#fixedban', 'iframe[id^="google_ads"]', '.Adsgoogle'];
    cy.get('body').then(($body) => {
        adSelectors.forEach((sel) => {
            if ($body.find(sel).length) {
                cy.get(sel).invoke('remove');
            }
        });
    });
});

