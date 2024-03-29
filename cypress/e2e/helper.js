//general cypress login function
function login() {
    const userLogin = {
      username: "isaac",
      password: "isaac"
    };
  
    //start at beginning page to login and stuff
    cy.visit('https://icy-stone-000b70d1e.4.azurestaticapps.net/login');
  
    //login with username and pass
    cy.get('input[name=username]').type(userLogin.username);
    cy.get('input[name=password]').type(userLogin.password);
    //submit login
    cy.get('input[type=button]').click();
  }
  
  export default login