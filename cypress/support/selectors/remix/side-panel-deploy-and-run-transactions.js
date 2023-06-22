export const compiledContracts = () => cy.get('.udapp_contractNames')

export const deployBtn = () => cy.get('.udapp_contractActionsContainerSingle button[data-id="Deploy - transact (not payable)"]')

export const deployedContractsLabel = () => cy.get('.input-group-text')

export const openCloseDeployedContract = () => cy.get('.udapp_titleExpander')

export const balanceDeployedContractLbl = () => cy.get('[data-id="instanceContractBal"] > label')

export const incrementDeployedContractBtn = () => cy.get('.udapp_instanceButton').contains(/^increment$/)

export const decrementDeployedContractBtn = () => cy.contains('.udapp_instanceButton', /^decrement$/)

export const getDeployedContractBtn = () => cy.get('.udapp_instanceButton').contains(/^get$/) //exact match text

export const getUintText = () => getDeployedContractBtn()
    .parents('div.udapp_contractProperty')
    .siblings('div[data-id="udapp_value"]')
    .contains('uint256:')
    .invoke('text')

export const qtyCupsDeployedContractBtn = () => cy.contains('qtyCups')

export const saveCurrentNumberHotFudgeSauce = (currentValueName) => getUintText()
    .then(
        $text => cy.wrap($text.replace('uint256: ', '')) //filtering string to get just the value
            .then(parseInt)
            .as(currentValueName)
    )

/**
 * since negatives numbers are not allowed: 
 *      we need to increment until is greater than zero, otherwise 0-1=0 and expects won't work
 * @returns 
 */
export const incrementMoreThanZero = () => cy.then(
    function () {
        if (this.originalNumberHotFudgeSauce === 0) { //increment
            incrementDeployedContractBtn().click().wait(1000)

            getDeployedContractBtn().click().wait(500)
            saveCurrentNumberHotFudgeSauce('originalNumberHotFudgeSauce')
        }
    })

export const actionAndCheckValue = () => {
    sidePanelDeployRunTransactions.getDeployedContractBtn().click()

        sidePanelDeployRunTransactions.saveCurrentNumberHotFudgeSauce('originalNumberHotFudgeSauce') 

        sidePanelDeployRunTransactions.incrementDeployedContractBtn()
          .click()
          .wait(1000) //until transaction is processed

        sidePanelDeployRunTransactions.getDeployedContractBtn()
          .click()
          .wait(1000)

        sidePanelDeployRunTransactions.saveCurrentNumberHotFudgeSauce('updatedNumberHotFudgeSauce')

        cy.then(function () {
          expect(this.updatedNumberHotFudgeSauce).to.be.greaterThan(this.originalNumberHotFudgeSauce)

          expect(this.updatedNumberHotFudgeSauce).to.equal(this.originalNumberHotFudgeSauce + 1)
        })
}