import login from './helper';

describe('Test to make sure everythin is in main page', () => {
    it('check header and table exist and have default elements', () => {
        cy.visit('https://icy-stone-000b70d1e.4.azurestaticapps.net/home');

        //check header info
        cy.get('.header').should('exist');
        cy.get('.large-title').should('have.text', 'Pickup');
        cy.get('.create-game-button').should('have.attr', 'href', '/create-game');
        cy.get('.profile-button').should('have.attr', 'href', '/profile');
        cy.get('.settings-button').should('have.attr', 'href', '/settings');

        //check table is there for games
        cy.get('table').should('exist');
        cy.get('table thead div div').should('have.text', 'Current Games');
    })

    it('check game preview element exists and is correct', () => {
        login();

        cy.get('.rounded-rectangle').first().should('exist');
        cy.get('.rounded-rectangle').first().within(() => {
            cy.get('div').should('have.length', 8);
            cy.contains('Time: ').should('exist');
            cy.contains('id:').should('exist');
            cy.contains('Location: ').should('exist');
            cy.contains('Numbers: ').should('exist');
            cy.contains('Details').should('exist');
            cy.get('a').should('have.attr', 'href');

        });
    })
})