import * as modalSelectors from "../support/selectors/remix/modals"
import * as sidePanel from "../support/selectors/remix/side-panel"
import { deployAndRunTransactions, fileExplorer } from "../support/selectors/remix/icon-panel"

describe('remix ide spec', () => {
  before(() => {
    cy.visit('/')
    modalSelectors.helpUsToImprove().click()
  })

  //avoid known issue because of 'testIsolation: false' config
  beforeEach(() => {
    cy.log(".")
  })

  it('deploy & run transactions', () => {
    sidePanel.validateFileExplorerTitle()

    deployAndRunTransactions().click() //if "Help us to improve Remix IDE" modal is still displayed you need to use "..udapp/i}, {timeout: 30000}).click({force: true})"
    sidePanel.deployRunTransactionsTitle().should('be.visible').and('have.text', 'Deploy & run transactions')
  })

  it('delete first contract', () => {
    fileExplorer().click()
    sidePanel.validateFileExplorerTitle()
    cy.wait(4000) //I mandatorily need to wait here since there is a flash from default_workspace to localhost and come back again
    cy.findByRole('button', {name: /default_workspace/i});
    cy.get('ul[data-id="treeViewUltreeViewMenu"] span[title="contracts"]', {timeout: 10000}).click({force: true})
    cy.get('ul[data-id="treeViewUltreeViewcontracts"] li:first-child span.text-nowrap').then($value => {
      cy.wrap($value.text()).as('firstContractName') //Grab the name of the current contract
    })
    cy.get('ul[data-id="treeViewUltreeViewcontracts"] li').first().rightclick({force: true})
    cy.get('li[id="menuitemdelete"]').click()
    cy.get('[data-id="fileSystemModalDialogContainer-react"] > .modal-dialog .modal-ok').click({force: true})
    cy.get('@firstContractName').then((firstContract) => {
      cy.get('ul[data-id="treeViewUltreeViewcontracts"] li:first-child span.text-nowrap')
      .invoke('text').should("not.eq", firstContract) //Validate first contract name is not visible anymore / does not exist 
    })
  })

  it('first smart contract - wip', () => {
    // TODO: finish this test
  })
})