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
        .invoke('text').should("not.eq", firstContract) //Validate first contract name is not visible anymore / does not exist 
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
    cy.get('div.view-line').type(`
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.8.0;
    contract HotFudgeSauce {
        uint public qtyCups;
        // Get the current hot fudge quantity
        function get() public view returns (uint) {
            return qtyCups;
        }
        // Increment hot fudge quantity by 1
        function increment() public {
            qtyCups += 1; // same as  qtyCups = qtyCups + 1;
        }
        // Function to decrement count by 1
        function decrement() public {
            qtyCups -= 1; // same as  qtyCups = qtyCups - 1;
        }
    }`) //not delay needed
  })
})

