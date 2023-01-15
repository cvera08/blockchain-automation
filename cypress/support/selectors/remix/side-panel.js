const fileExplorerTitle = () => cy.findByRole('heading', { name: /file explorer/i })

export const deployRunTransactionsTitle = () => cy.findByRole('heading', { name: /deploy & run transactions/i })

export const validateFileExplorerTitle = () =>
    fileExplorerTitle().contains('File explorer').and('be.visible')  //or .should('be.visible').and('have.text', 'File explorer')

export const defaultWorkspaceDdl = () => cy.findByRole('button', { name: /default_workspace/i });

export const contractsFolder = () => cy.get('ul[data-id="treeViewUltreeViewMenu"] span[title="contracts"]', { timeout: 10000 })

export const contractList = () => cy.get('ul[data-id="treeViewUltreeViewcontracts"] li')

export const contractListNames = () => cy.get('ul[data-id="treeViewUltreeViewcontracts"] li span.text-nowrap')

export const firstContractName = () => cy.get('ul[data-id="treeViewUltreeViewcontracts"] li:first-child span.text-nowrap')

export const createNewFile = () => cy.get('span[id="createNewFile"]')

export const menuItemDelete = () => cy.get('li[id="menuitemdelete"]')