import * as modalSelectors from "../support/selectors/remix/modals"
import { deployAndRunTransactions, fileExplorer, solidityCompiler } from "../support/selectors/remix/icon-panel"
import * as sidePanel from "../support/selectors/remix/side-panel"
import * as mainContractsView from "../support/selectors/remix/main-contracts-view"

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
  it('deploy & run transactions menu', () => {
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
    sidePanel.firstContractName().then($value => cy.wrap($value.text()).as('firstContractName')) //Grab the name of the current contract
    sidePanel.firstContractName().rightclick({ force: true })
    sidePanel.menuItemDelete().click()
    modalSelectors.deleteItemOK().click({ force: true })
    cy.get('@firstContractName').then((firstContract) => { //Validate first contract name is not visible anymore / does not exist 
      sidePanel.firstContractName().invoke('text').should('not.eq', firstContract)
    })
  })

  it('add new smart contract', () => {
    const contractName = `X_ATC_${Cypress._.random(0, 1e6)}.sol`

    sidePanel.contractList().its('length').then((number) => { cy.wrap(number).as('contractsAmount') })
    sidePanel.createNewFile().click().type(`${contractName}{enter}`, { delay: 100 })

    cy.get('@contractsAmount').then((contractsAmount) => { //validate there is one new element in the contract list
      sidePanel.contractList().its('length').should('eq', contractsAmount + 1)
    })
    sidePanel.contractListNames().contains(contractName) //validate the new contract name is present
  })

  it('create hot fudge sauce contract', () => {
    sidePanel.contractListNames().last()
      .click({ force: true }) //overlay from icon panel
      .invoke('text').then(lastContractName => cy.wrap(lastContractName).as('lastContractName'))

    mainContractsView.firstTitleTab().invoke('text').then((contractNameTab) => { //validate that the last contract was opened in a new tab
      cy.get('@lastContractName').should('eq', contractNameTab)
    })

    cy.readFile('cypress/support/smart-contracts/HotFudgeSauce.sol').then((contractCode) => { //code the contract
      mainContractsView.editorView().type(contractCode, { delay: 0 }) //delay:0 if not the IDE automatically adds additional closes for the curly braces
    })

    mainContractsView.editorView().first().invoke('text').should('not.to.be.empty') //validate the contract is not empty

    mainContractsView.editorView().contains('SPDX-License-Identifier').should('be.visible') //validate the contract was written
  })

  it('compile contract', () => {
    solidityCompiler().click()
    sidePanel.versionSelectorDdl().select('soljson-v0.8.8+commit.dddeac2f.js')

    sidePanel.compileBtn().should('be.enabled').click()

    sidePanel.compiledContracts() //validate the contract was compiled
      .should('exist')
      .and('be.visible')
      .and('contain.text', 'HotFudgeSauce')
  })
})
