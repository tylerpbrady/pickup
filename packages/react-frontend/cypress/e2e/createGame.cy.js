import login from './helper';

describe('create game test', () => {
  it('displays 9 user input spaces and 1 button', () => {
    cy.visit('https://icy-stone-000b70d1e.4.azurestaticapps.net/create-game');

    cy.get('form').should('exist');
    cy.get('form label').should('have.length', 9);
    cy.get('form input[type=text]').should('have.length', 4);
    cy.get('form textarea').should('have.length', 1);
    cy.get('form input[type=number]').should('have.length', 2);
    cy.get('form input[type=date]').should('exist');
    cy.get('form input[type=time]').should('exist');
    cy.get('form input[type=button]').should('exist');
  })
  
  it('input data and submit to backend', () => {
    login();
    cy.get('.create-game-button').click();
  
    cy.get('input[name=title]').type("3v3 Basketball");
    cy.get('input[name=sport]').type("Basketball");
    cy.get('textarea[name=description]').type("We will be playing 3 on 3 basketball for about an hour and a half.");
    cy.get('input[name=location]').type("Cal Poly REC");
    cy.get('input[name=maxPlayers]').clear().type("9");
    cy.get('input[name=equipment]').type("basketball shoes");
    cy.get('input[name=skill]').clear().type("7");
    cy.get('input[name=dateDate]').type("2024-03-15");
    cy.get('input[name=dateTime]').type("17:30");

    //submit and go back to check if it was added
    cy.get('form input[type=button]').click();
    cy.wait(2000);
    cy.get('.header .large-title').click();
    cy.contains('3v3 Basketball').should('exist');
    cy.wait(2000); //see the new game has been added and wait for 2 seconds before deleting
    cy.contains('.rounded-rectangle', '3v3 Basketball').within(() => {
      // Within the rounded rectangle, find and click the delete button
      cy.get('button').click();
    });
  })
})