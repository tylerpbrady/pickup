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
    cy.cy.get('.create-game-button').click();
  
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
    cy.get('.header').click();
    cy.contains('3v3 Basketball').should('exist');
  })
  /*it('submit data', () => {
    //cy.get('form input[type=button]').click();
  })
  it('check new game was uploaded', () => {
    cy.visit('https://icy-stone-000b70d1e.4.azurestaticapps.net/home');

    const thirdEntryTextSelector = 'table tbody tr:nth-child(3) div:nth-child(1)';
    cy.get(thirdEntryTextSelector).should('contain.text', '3v3 Basketball');
  })*/
})