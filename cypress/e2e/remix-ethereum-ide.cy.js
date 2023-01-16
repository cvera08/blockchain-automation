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
    sidePanel.firstContractName().then($value => {
      cy.wrap($value.text()).as('firstContractName') //Grab the name of the current contract
    })
    sidePanel.firstContractName().rightclick({ force: true })
    sidePanel.menuItemDelete().click()
    modalSelectors.deleteItemOK().click({ force: true })
    cy.get('@firstContractName').then((firstContract) => {
      sidePanel.firstContractName()
        .invoke('text').should('not.eq', firstContract) //Validate first contract name is not visible anymore / does not exist 
    })
  })

  it('add new smart contract', () => {
    const contractName = `X_ATC_${Cypress._.random(0, 1e6)}.sol`

    sidePanel.contractList().its('length').then((number) => {
      cy.wrap(number).as('contractsAmount')
    })
    sidePanel.createNewFile().click().type(`${contractName}{enter}`)

    cy.get('@contractsAmount').then((contractsAmount) => { //validate there is one new element in the contract list
      sidePanel.contractList().its('length').should('eq', contractsAmount + 1)
    })
    sidePanel.contractListNames().contains(contractName) //validate the new contract name is present
  })

  it.only('create hot fudge sauce contract', () => {
    cy.wait(10000)
    sidePanel.contractsFolder().click({ force: true })
    sidePanel.contractListNames().last()
      .click()
      .invoke('text').then(lastContractName => cy.wrap(lastContractName).as('lastContractName'))

    cy.get('#react-tabs-2 > .nav-item > .title-tabs').invoke('text').then((contractNameTab) => { //validate that the last contract was opened in a new tab
      cy.get('@lastContractName').should('eq', contractNameTab)
    })

    cy.readFile('cypress/support/smart-contracts/HotFudgeSauce.sol').then((contractCode) => { //code the contract
      cy.get('div.view-line').type(contractCode)
    })
    cy.pause()

    //*** validate the contract was written: *** 
    //cy.get('div.view-line').should('not.be.empty') //validate the contract was written
    //cy.get('div.view-line').should('not.have.value', '') //validate the contract was written
    //cy.get('div.view-line > span > span').first().should('have.value', '// SPDX-License-Identifier: MIT')
    cy.get('div.view-line > span > span').first().invoke('text').then(cy.log)
        //.should('have.value', '// SPDX-License-Identifier: MIT')
    cy.get('div.view-line').first().invoke('text').then(cy.log)
    //cy.get('div.view-line').first().invoke('text').should('have.value', `// SPDX-License-Identifier: MIT`)
    //cy.get('div.view-line').first().invoke('text').should('eq', `SPDX-License-Identifier`)
    //cy.get('div.view-line').first().invoke('text').to.contain('SPDX-License-Identifier')
    //cy.get('div.view-line').first().invoke('text').contains('SPDX-License-Identifier').should('be.visible')
    cy.get('div.view-line').contains('SPDX-License-Identifier').should('be.visible') //validate the contract was written / is not empty

    //*** validate the contract is not empty *** 
    cy.pause()
    cy.log('2>>>')
    //cy.get('div.view-line').first().invoke('text').should('not.have.value', '') //it fails when there is text in the line/input
    cy.get('div.view-line').first().invoke('text').should('not.to.be.empty')
    cy.pause()
    cy.log('3>>>')
    cy.get('div.view-line').first().invoke('text').should(($line) => {
      expect($line).not.to.be.empty
    })
  })
})

