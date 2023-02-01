/// <reference types="Cypress"/>

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html');
    });
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'

        cy.get('#firstName').type('Willian')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('williancoutos@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    });

    it('mensagem de erro ao submeter o formulário com um email inválido', function () {
        cy.get('#firstName').type('Willian')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('williancoutos@gmail,com')
        cy.get('#open-text-area').type('Qualquer coisa')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor náo-num[erico', function () {
        cy.get('#phone')
            .type('asdfgh')
            .should('have.value', '')
    })

    it('exube mensagem de erro quando telefone for obrigatório', function () {
        cy.get('#firstName').type('Willian')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('williancoutos@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Qualquer coisa')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Willian')
            .should('have.value', 'Willian')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Silva')
            .should('have.value', 'Silva')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('williancoutos@gmail.com')
            .should('have.value', 'williancoutos@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('99887766')
            .should('have.value', '99887766')
            .clear()
            .should('have.value', '')
    })

    it('mensagem de erro ao submeter o formulario sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('sucesso com comando customizado', function () {
        cy.fillManatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('selecionar um produto pelo texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('selecionar um produto por seu valor', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('selecionar um produto por seu indice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento Feedback', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos os checkboxes depois desmarca o ultimo', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo selecionando drag-and-drop', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona uma fixture com alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
});
