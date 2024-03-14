import login from './helper.js';

describe('Verify everything in profile main page', () => {
    it('make sure all fields are present', () => {
        login();

        //go to profile page
        cy.get('.header .profile-button').click();

        //check for relevant elements
        cy.get('.profile-field').should('exist');
        cy.get('.profile-label').should('have.length', '3');
        cy.get('.profile-data').should('have.length', '3');

        //make sure update profile button exists
        cy.get('.button').should('have.length', '1');
    })
})