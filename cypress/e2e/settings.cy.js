describe('settings', () => {
    beforeEach( () => {
        cy.visit('https://icy-stone-000b70d1e.4.azurestaticapps.net/settings');
    })
    it('check for both buttons', () => {
        //check for buttons
        cy.get('.log-out-button').should('exist');
        cy.get('.edit-profile-button').should('exist');

        //check for links too
        cy.get('.log-out-button').should('have.attr', 'href', '/welcome');
        cy.get('.edit-profile-button').should('have.attr', 'href', '/edit-profile');
    })
})