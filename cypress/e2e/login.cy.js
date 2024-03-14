describe('login', () => {
  it('go to login page', () => {
    //sample user login data
    const userLogin = {
      username: "isaac",
      password: "isaac"
    };

    //info for login and create account button
    const loginButton = '.box .button-container a[href="/login"] button';
    const createAccountButton = '.box .button-container a[href="/create-account"] button';

    //start at beginning page to login and stuff
    cy.visit('https://icy-stone-000b70d1e.4.azurestaticapps.net/welcome');

    //check for both buttons
    cy.get(loginButton).should('exist');
    cy.get(createAccountButton).should('exist');

    //go create an account
    cy.get(createAccountButton).click();
    cy.get('form').should('exist');
    cy.get('form input[type=text]').should('have.length', 2);
    cy.get('form input[type=button]').should('have.length', 1);
    cy.get('input[name=username]').type(userLogin.username);
    cy.get('input[name=password]').type(userLogin.password);
    cy.get('input[type=button]').click(); //this should fail to make an account because the account is already created
    cy.wait(2000);

    //now click back to login button and login
    cy.get('.box .button-container a[href="/login"] button').should('exist');
    cy.get('.box .button-container a[href="/login"] button').click();
    cy.get('form').should('exist');
    cy.get('form input[type=text]').should('have.length', 1);
    cy.get('form input[type=password').should('have.length', 1);
    cy.get('form input[type=button]').should('have.length', 1);
    cy.get('input[name=username]').type(userLogin.username);
    cy.get('input[name=password]').type(userLogin.password);
    cy.get('input[type=button]').click();

    //check to make sure redirected to home page
    cy.get('table').should('exist');
  })
})