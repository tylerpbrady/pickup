describe('Test user creation with random username and pass', () => {
    it('create a random account', () => {
        const newUser = {
            username: generateRandomString(),
            password:  generateRandomString()
        }

        cy.visit('https://icy-stone-000b70d1e.4.azurestaticapps.net/create-account');
        cy.get('input[name=username]').type(newUser.username);
        cy.get('input[name=password]').type(newUser.password);
        cy.get('input[type=button]').click();

        cy.get('table').should('exist');
    })
})

function generateRandomString() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_.';
    const charactersLength = characters.length;
    
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}