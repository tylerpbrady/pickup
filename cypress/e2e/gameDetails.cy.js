import login from './helper';

describe('test game details page for given game', () => {
    it('go to game detail page and check for all elements', () => {
        login();

        //click on details link to game details
        cy.get('.rounded-rectangle').first().within(() => {
            cy.get('a').click();
        })

        //check content of game details box
        cy.get('.rounded-rectangle').within(() => {
            cy.contains('Details').should('exist');
            cy.get('div').should('have.length', '22');
            cy.contains('Sport').should('exist');
            cy.contains('Time').should('exist');
            cy.contains('Location').should('exist');
            cy.contains('Numbers').should('exist');
            cy.contains('Skill Level').should('exist');
            cy.contains('Equipment Needed').should('exist');
            cy.contains('Description').should('exist');
        })

        //check content of players box
        cy.get('.rounded.rectangle').within(() => {
            cy.contains('Players').should('exist');
            cy.get('button').should('exist');
        })
    })
})