Cypress.Commands.add('login', (user, senha) => {
    cy.visit('/')
    cy.get('input[id=j_username]').type(user)
    cy.get('input[id=j_password]').type(senha)
    cy.get('button[id=btn_login]').should('is.visible').click()
})

Cypress.Commands.add('getOperation', () => {
    cy.get("li > a[id=nav_item_operacoes]").should('is.visible').click()
})

Cypress.Commands.add('registerInOperation', () => {
    cy.wait(100)
    cy.get('#btn_cadastrar_operacao').scrollIntoView({ duration : 2000})
            .should('is.visible')
                    .click()
})

Cypress.Commands.add('getTypeBasead', (type) => {
    if(type == 'Agrícola') {
        cy.contains('a[id=btn_agricola]', type).should('is.visible').click()
    }else {
        cy.contains('a[id=btn_pecuaria]', type).should('is.visible').click()
    }
   
})


Cypress.Commands.add('getFilial', (filial) => {
    cy.get('select[id=unidadeId]').should('is.visible').select(filial);
})


Cypress.Commands.add('startRegister', () => {
    cy.get('button[id=btn-inicia]').should('is.visible').click();
})


Cypress.Commands.add('registerOperation', (unicRegister) => {
    cy.get('textarea[name="operacao.descricao"]').should('is.visible').type(unicRegister.complement);
    
    if (unicRegister.type === 'Pecuária') {
        cy.get('input[name="operacao.totalAnimal"]').should('is.visible').type(unicRegister.animalBenef);
    } else {
        cy.get('input[name="operacao.areaFinanciada"]').should('is.visible').type(unicRegister.financedArea);
    }

    cy.get('select[id="operacao.culturaId"]').should('is.visible').select(unicRegister.culture);
    cy.get('select[id="operacao.anoSafraId"]').should('is.visible').select(unicRegister.yearSaf);
    cy.get('textarea[id="operacao.roteiroAcesso"]').should('is.visible').type(unicRegister.acessRot);
});



Cypress.Commands.add('definedTypeInClientUser', (unicRegister) => {
    if(unicRegister.client == 'Pessoa Física') {
        cy.get('input[id=tipo_cadastro_pf]').click()
        cy.get('input[id="operacao.nome"').should('is.visible').type(unicRegister.nameClient)
        cy.get('input[id=responsavel_cpf]').should('is.visible').type(unicRegister.valueClient)
    } else {
        cy.get('input[id=tipo_cadastro_pj]').click()
        cy.get('input[id="operacao.nome"').should('is.visible').type(unicRegister.nameClient)
        cy.get('input[id=responsavel_cnpj]').should('is.visible').type(unicRegister.valueClient)
    }
})


Cypress.Commands.add('processGleba', (gleba) => {
    cy.get('a[id=btn_importar_gleba]').should('be.visible').click();
  
    cy.get('input[value=K]').click();
  
    cy.get('input[name=glebaKml]').selectFile(`cypress/e2e/archives/${gleba}`);
  
    cy.intercept('POST', '/app/rest/gleba/upload/kml').as('importacaoGleba');
  
    cy.get('button[id=cadastro-btn]').click();

    cy.wait('@importacaoGleba').its('response.statusCode').should('eq', 200);
});
  