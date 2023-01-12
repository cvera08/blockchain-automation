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
    //cy.findByRole('button', {name: /localhost/i}).should("not.be.visible")
    cy.get('ul[data-id="treeViewUltreeViewMenu"] span[title="contracts"]', {timeout: 10000}).click({force: true})
    //const firstContract = cy.get(....) //TODO: take the name of the contract
    cy.get('ul[data-id="treeViewUltreeViewcontracts"] li').first().rightclick({force: true})
    cy.get('li[id="menuitemdelete"]').click()
    //cy.wait(1000) //if we click so quick the real deletion is never performed
    cy.get('[data-id="fileSystemModalDialogContainer-react"] > .modal-dialog .modal-ok').click({force: true})
    //TODO: validate firstContract (name) is not visible anymore / does not exist
  })

  it('first smart contract - wip', () => {
    // TODO: finish this test
  })
})