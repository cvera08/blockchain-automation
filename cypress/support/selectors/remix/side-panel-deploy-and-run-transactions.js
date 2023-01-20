export const compiledContracts = () => cy.get('.udapp_contractNames')

export const deployBtn = () => cy.get('.udapp_contractActionsContainerSingle button[data-id="Deploy - transact (not payable)"]')

export const deployedContractsLabel = () => cy.get('.input-group-text')