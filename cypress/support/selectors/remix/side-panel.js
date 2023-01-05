export const fileExplorerTitle = () => cy.findByRole('heading', { name: /file explorer/i })

export const deployRunTransactionsTitle = () => cy.findByRole('heading', { name: /deploy & run transactions/i })