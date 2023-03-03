import * as modalSelectors from "../support/selectors/remix/modals"
import { deployAndRunTransactions, fileExplorer, solidityCompiler } from "../support/selectors/remix/icon-panel"
import * as sidePanel from "../support/selectors/remix/side-panel"
import * as sidePanelDeployRunTransactions from "../support/selectors/remix/side-panel-deploy-and-run-transactions"
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

  /* ability to stop the execution if the test fails.
  Already configured to run sequentially in cypress.config.js 
  by using "testIsolation: false") */
  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      Cypress.runner.stop()
    }
  })

  context('site is alive', () => {
    /* Important: 
    testIsolation: false (cypress.config.js)
    This suite is running one test after the other considering the last stage of the previous one,
    even when it is a well-known bad practice (it generates dependencies instead of atomic ATCs).
    This is because the online remix IDE is slow in its start/refresh and even the application is error-prone in several launches. 
    In this way, the whole execution is much faster than reloading each time. */
    it('deploy & run transactions menu', () => {
      sidePanel.validateFileExplorerTitle()

      deployAndRunTransactions().click({ force: true }) //if "Help us to improve Remix IDE" modal is still displayed you need to use "..udapp/i}, {timeout: 30000}).click({force: true})"
      sidePanel.deployRunTransactionsTitle().should('be.visible').and('have.text', 'Deploy & run transactions')
    })
  })

  context('test contracts', () => {
    context('contract setup', () => {
      it('delete first contract', () => {
        fileExplorer().click()
        sidePanel.validateFileExplorerTitle()
        cy.wait(8000) //I mandatorily need to wait here since there is a flash from default_workspace to localhost and come back again
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
        const randomNumber = Cypress._.random(0, 1e6)
        const contractName = `X_ATC_${randomNumber}.sol`

        sidePanel.contractList().its('length').then((number) => { cy.wrap(number).as('contractsAmount') })
        sidePanel.createNewFile().click().wait(2000).type(`${contractName}{enter}`, { delay: 200 })

        cy.get('@contractsAmount').then((contractsAmount) => { //validate there is one new element in the contract list
          sidePanel.contractList().its('length').should('eq', contractsAmount + 1)
        })
        sidePanel.contractListNames().contains(randomNumber) //validate the new contract name is present //partial name check because of delays in remix
      })
    })

    context('build contract', () => {
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

      it('deploy contract', () => {
        deployAndRunTransactions().click()
        sidePanelDeployRunTransactions.compiledContracts().and('contain.text', 'HotFudgeSauce - contracts/') //verify there is a contract already compiled

        sidePanelDeployRunTransactions.deployBtn().click()
        sidePanelDeployRunTransactions.deployedContractsLabel().and('contain.text', 'HotFudgeSauce')
      })

      it('check options of deployed contract', () => {
        sidePanelDeployRunTransactions.openCloseDeployedContract().click()

        sidePanelDeployRunTransactions.balanceDeployedContractLbl()
          .contains('Balance')
          .should('be.visible')

        sidePanelDeployRunTransactions.decrementDeployedContractBtn().scrollIntoView().should('be.visible')
        sidePanelDeployRunTransactions.incrementDeployedContractBtn().should('be.visible')
        sidePanelDeployRunTransactions.getDeployedContractBtn().should('be.visible')
        sidePanelDeployRunTransactions.qtyCupsDeployedContractBtn().should('be.visible')
      })

      it('increment and check value', () => {
        sidePanelDeployRunTransactions.getDeployedContractBtn().click()

        sidePanelDeployRunTransactions.getUintText()
          .then($text => cy.wrap($text.replace('uint256: ', '')).then(parseInt).as('originalNumberHotFudgeSauce')) //filtering string to get just the value

        sidePanelDeployRunTransactions.incrementDeployedContractBtn()
          .click()
          .wait(1000) //until transaction is processed

        sidePanelDeployRunTransactions.getDeployedContractBtn()
          .click()
          .wait(1000)

        sidePanelDeployRunTransactions.getUintText()
          .then($text => cy.wrap($text.replace('uint256: ', '')).then(parseInt).as('updatedNumberHotFudgeSauce'))

        cy.then(function () {
          expect(this.updatedNumberHotFudgeSauce).to.be.greaterThan(this.originalNumberHotFudgeSauce)

          expect(this.updatedNumberHotFudgeSauce).to.equal(this.originalNumberHotFudgeSauce + 1)
        })
      })

    })
  })

})
