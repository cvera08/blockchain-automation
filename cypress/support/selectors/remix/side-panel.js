const fileExplorerTitle = () => cy.findByRole('heading', { name: /file explorer/i })

export const deployRunTransactionsTitle = () => cy.findByRole('heading', { name: /deploy & run transactions/i })

export const validateFileExplorerTitle = () =>
    fileExplorerTitle().contains('File explorer').and('be.visible')  //or .should('be.visible').and('have.text', 'File explorer')