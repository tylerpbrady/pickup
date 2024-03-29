describe('Test user creation with random username and pass', () => {
    it('create a random account', () => {
        const newUser = {
            username: generateRandomString(),
            password:  generateRandomString()
        }
        //go to create account page and enter username and pass and submit
        cy.visit('https://icy-stone-000b70d1e.4.azurestaticapps.net/create-account');
        cy.get('input[name=username]').type(newUser.username);
        cy.get('input[name=password]').type(newUser.password);
        cy.get('input[type=button]').click();

        cy.wait(1000);

        //make sure after redirection to main page the table exists
        cy.get('table').should('exist');
    })
})

//simple function to manufacture a random username and password
function generateRandomString() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_.';
    const charactersLength = characters.length;
    
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}