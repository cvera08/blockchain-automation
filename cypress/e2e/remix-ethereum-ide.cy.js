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

  /* Important: 
  testIsolation: false (cypress.config.js)
  This suite is running one test after the other considering the last stage of the previous one,
  even when it is a well-known bad practice (it generates dependencies instead of atomic ATCs).
  This is because the online remix IDE is slow in its start/refresh and even the application is error-prone in several launches. 
  In this way, the whole execution is much faster than reloading each time. */
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
    sidePanel.firstContractName().then($value => {
      cy.wrap($value.text()).as('firstContractName') //Grab the name of the current contract
    })
    sidePanel.firstContractName().rightclick({ force: true })
    sidePanel.menuItemDelete().click()
    modalSelectors.deleteItemOK().click({ force: true })
    cy.get('@firstContractName').then((firstContract) => {
      sidePanel.firstContractName()
        .invoke('text').should("not.eq", firstContract) //Validate first contract name is not visible anymore / does not exist 
    })
  })

  it('add new smart contract', () => {
    const contractName = `X_atc_${Cypress._.random(0, 1e6)}.sol`

    sidePanel.contractList().its('length').then((number) => {
      cy.wrap(number).as('contractsAmount')
    })
    sidePanel.createNewFile().click().type(`${contractName}{enter}`)

    cy.get('@contractsAmount').then((contractsAmount) => { //validate there is one new element in the contract list
      sidePanel.contractList().its('length').should('eq', contractsAmount + 1)
    })
    sidePanel.contractListNames().contains(contractName) //validate the new contract name is present
  })
})