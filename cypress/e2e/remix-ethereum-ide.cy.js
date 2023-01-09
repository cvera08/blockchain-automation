import * as modalSelectors from "../support/selectors/remix/modals"
import * as sidePanel from "../support/selectors/remix/side-panel"
import { deployAndRunTransactions } from "../support/selectors/remix/icon-panel"

describe('remix ide spec', () => {
  it('deploy & run transactions', () => {
    cy.visit('/')

    modalSelectors.helpUsToImprove().click()
    sidePanel.fileExplorerTitle().contains('File explorer').and('be.visible') //or .should('be.visible').and('have.text', 'File explorer')

    deployAndRunTransactions().click() //if "Help us to improve Remix IDE" modal is still displayed you need to use "..udapp/i}, {timeout: 30000}).click({force: true})"
    sidePanel.deployRunTransactionsTitle().should('be.visible').and('have.text', 'Deploy & run transactions')
  })
})