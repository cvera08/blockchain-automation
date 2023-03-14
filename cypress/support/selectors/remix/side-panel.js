import { deleteItemOK } from './modals'


const fileExplorerTitle = () => cy.findByRole('heading', { name: /file explorer/i })

export const deployRunTransactionsTitle = () => cy.findByRole('heading', { name: /deploy & run transactions/i })

export const validateFileExplorerTitle = () =>
    fileExplorerTitle().contains('File explorer').and('be.visible')  //or .should('be.visible').and('have.text', 'File explorer')

export const defaultWorkspaceDdl = () => cy.findByRole('button', { name: /default_workspace/i }, { timeout: 10000 });

export const contractsFolder = () => cy.get('ul[data-id="treeViewUltreeViewMenu"] span[title="contracts"]', { timeout: 10000 })

export const contractList = () => cy.get('ul[data-id="treeViewUltreeViewcontracts"]').then($elem => $elem.find('li')) //it needs to this in this way just in case the element does not exist (empty contract list)

export const contractListNames = () => cy.get('ul[data-id="treeViewUltreeViewcontracts"] li span.text-nowrap')

export const firstContractName = () => cy.get('ul[data-id="treeViewUltreeViewcontracts"] li:first-child span.text-nowrap')

export const createNewFile = () => cy.get('span[id="createNewFile"]')

export const menuItemDelete = () => cy.get('li[id="menuitemdelete"]')

export const versionSelectorDdl = () => cy.get('#versionSelector')

export const compileBtn = () => cy.get('#compileBtn', { timeout: 25000 })

export const compiledContracts = () => cy.get('#compiledContracts')

export const waitForDefaultWorkspaceDdl = () => {
    if (Cypress.browser.name === 'electron') { //No need in other browsers than Electron
        cy.get('#workspacesSelect .mr-auto')
            .contains('localhost', { timeout: 8000 })
            .should('be.visible')
    }

    defaultWorkspaceDdl()
        .should('be.visible')
}

export const deleteFirstContractAction = () => {
    cy.get('ul[data-id="treeViewUltreeViewcontracts"]')
        .then($elem => {
            if ($elem.find('li:first-child span.text-nowrap').length === 0) {
                cy.log('[NO contracts to delete - empty list]()')
            } else {
                firstContractName().then($value => cy.wrap($value.text()).as('firstContractName')) //Grab the name of the current contract
                firstContractName().rightclick({ force: true })
                menuItemDelete().click()
                deleteItemOK().click({ force: true })
                cy.get('@firstContractName').then((firstContract) => { //Validate first contract name is not visible anymore / does not exist 
                    firstContractName().invoke('text').should('not.eq', firstContract)
                })
            }
        })
}