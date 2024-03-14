import login from './helper.js';

describe('check update profile works', () => {
    it('edit profile and submit', () => {
        login();

        cy.get('.header .profile-button').click();

        cy.get('.button').click();

        cy.get('form').should('exist');

        cy.get('input[name="name"]').type('Isaac Schiffler');
        cy.get('input[name="sports of interest"]').type('Basketball, Soccer, Tennis');
        cy.get('textarea[name="city"]').type('San Luis Obispo');

        cy.get('input[type=button]').click();

        cy.get('.header .profile-button').click();

        cy.contains('Isaac Schiffler').should('exist');
        cy.contains('Basketball, Soccer, Tennis').should('exist');
        cy.contains('San Luis Obispo').should('exist');
    })
})