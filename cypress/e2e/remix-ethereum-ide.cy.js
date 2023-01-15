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
    sidePanel.defaultWorkspaceDdl().should('be.visible')
    sidePanel.contractsFolder().click({ force: true })
    sidePanel.firstContract().then($value => {
      cy.wrap($value.text()).as('firstContractName') //Grab the name of the current contract
    })
    sidePanel.firstContract().rightclick({ force: true })
    sidePanel.menuItemDelete().click()
    modalSelectors.deleteItemOK().click({ force: true })
    cy.get('@firstContractName').then((firstContract) => {
      sidePanel.firstContract()
        .invoke('text').should("not.eq", firstContract) //Validate first contract name is not visible anymore / does not exist 
    })
  })

  it.only('add new smart contract', () => {
    //fileExplorer().click()
    //sidePanel.validateFileExplorerTitle()
    cy.wait(10000)
    sidePanel.contractsFolder().click({ force: true })
    cy.get('ul[data-id="treeViewUltreeViewcontracts"] li').its('length').then((number) => {
      cy.wrap(number).as('contractsAmount')
    })
    cy.get('span[id="createNewFile"]').click().type('hello.sol{enter}')
    //cy.get('ul[data-id="treeViewUltreeViewcontracts"] li:nth-of-type(4)').type('hello.sol{enter}')

    cy.get('@contractsAmount').then((contractsAmount) => { //validate there is one new element in the contract list
      cy.get('ul[data-id="treeViewUltreeViewcontracts"] li').its('length').should('be.equal', contractsAmount + 1)
    })

    //TODO: validate the new contract name is present
  })
})