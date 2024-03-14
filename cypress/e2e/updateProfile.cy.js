import login from './helper.js';

describe('check update profile works', () => {
    it('edit profile and submit', () => {
        login();

        //go to profile page
        cy.get('.header .profile-button').click();

        //click update profile button to go to update profile page
        cy.get('.button').click();

        //make sure form exists
        cy.get('form').should('exist');

        //input sample data for given user
        cy.get('input[name="name"]').type('Isaac Schiffler');
        cy.get('input[name="sports of interest"]').type('Basketball, Soccer, Tennis');
        cy.get('textarea[name="city"]').type('San Luis Obispo');

        //click button to submit
        cy.get('input[type=button]').click();

        //go back to main profile page and check entered data exists
        cy.get('.header .profile-button').click();

        cy.contains('Isaac Schiffler').should('exist');
        cy.contains('Basketball, Soccer, Tennis').should('exist');
        cy.contains('San Luis Obispo').should('exist');
    })
})