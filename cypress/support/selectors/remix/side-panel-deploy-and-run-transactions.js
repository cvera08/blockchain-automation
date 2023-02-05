export const compiledContracts = () => cy.get('.udapp_contractNames')

export const deployBtn = () => cy.get('.udapp_contractActionsContainerSingle button[data-id="Deploy - transact (not payable)"]')

export const deployedContractsLabel = () => cy.get('.input-group-text')

export const openCloseDeployedContract = () => cy.get('.udapp_titleExpander')

export const balanceDeployedContractLbl = () => cy.get('[data-id="instanceContractBal"] > label')

export const decrementDeployedContractBtn = () => cy.contains('decrement')

export const incrementDeployedContractBtn = () => cy.contains('increment')

export const getDeployedContractBtn = () => cy.contains('get')

export const qtyCupsDeployedContractBtn = () => cy.contains('qtyCups')