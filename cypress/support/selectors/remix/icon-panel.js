export const deployAndRunTransactions = () =>
    cy.findByRole('img', { name: /udapp/i })

export const fileExplorer = () =>
    cy.findByRole('img', { name: /filepanel/i })