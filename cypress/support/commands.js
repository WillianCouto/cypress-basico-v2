Cypress.Commands.add('fillManatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Willian')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('williancoutos@gmail.com')
    cy.get('#open-text-area').type('Lorem Ipsum is simply dummy text of the printing and typesetting industry.')
    cy.contains('button', 'Enviar').click()
})
