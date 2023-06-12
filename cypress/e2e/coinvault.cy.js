import "cypress-localstorage-commands";

describe('Coin Vault End-To-End Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('Clicking through all pages (Login, Profile, Trades & Portfolio) & Creating Trade', () => {
        let oldRowsTablePortfolio = 0
        let oldRowsTableTrades = 0

        //Login to Auth0
        cy.get(':nth-child(1) > .btn').click()
        cy.origin('https://coinvault.eu.auth0.com', () => {
            cy.get('input[name="username"]').type('rob.ongewenst@outlook.com')
            cy.get('input[name="password"]').type('Rob@!123')
            cy.get('button').should('be.visible').eq(2).click()
        })

        //Visit profile page
        cy.get(':nth-child(3) > .btn').click()
        cy.wait(10000)

        //Visit portfolio page
        cy.get(':nth-child(5) > .btn').click()
        cy.wait(10000)

        //Get rows from portfolio table
        cy.get("#portfolio")
            .find("tr")
            .then((row) => {
                oldRowsTablePortfolio = row.length
            }
        )

        //Visit trade page
        cy.get(':nth-child(4) > .btn').click()
        cy.wait(10000)

        //Get rows from trades table
        cy.get("#trades")
            .find("tr")
            .then((row) => {
                oldRowsTableTrades = row.length
            }
        )

        //Create trade with modal
        cy.get('.m-2').click()
        cy.get(':nth-child(2) > .form-control').type(100)
        cy.get('.modal-body > .btn').click()
        cy.get('.btn-close').click()
        cy.wait(10000)
        cy.reload()
        cy.wait(10000)

        //Get rows from trade table
        cy.get("#trades")
            .find("tr")
            .then((row) => {
                // Check that the trade was added to the table
                expect(oldRowsTableTrades + 1).to.eq(row.length)
            }
        )

        //Visit portfolio page
        cy.get(':nth-child(5) > .btn').click()
        cy.wait(10000)

        //Get rows from portfolio table
        cy.get("#portfolio")
            .find("tr")
            .then((row) => {
                // Check that the porfolio was added to the table
                expect(oldRowsTablePortfolio + 1).to.eq(row.length)
            }
        )

        //Logout from Auth0
        cy.get(':nth-child(2) > .btn').click()

        //End of test
        cy.end()
    })
})