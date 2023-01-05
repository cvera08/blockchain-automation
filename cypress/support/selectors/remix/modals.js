export const helpUsToImprove = () =>
    cy.get('[data-id="matomoModalModalDialogContainer-react"] > .modal-dialog .modal-close',
        { timeout: 30000 }) //Or in this way: cy.get('.modal-dialog .modal-close', {timeout: 30000}).click({ multiple: true , force: true })
