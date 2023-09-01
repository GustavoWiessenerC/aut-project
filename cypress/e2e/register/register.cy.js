import registerTypeAgricola from '../../fixtures/register-agricola.json';
import registerTypePecuaria from '../../fixtures/register-pecuaria.json';

describe('Create all registers', () => {

    beforeEach(() => {
        cy.login(Cypress.env('user'), Cypress.env('senha'));
    });

    registerTypeAgricola.forEach((unicRegister) => {
        registerOperationType(unicRegister);
    });

    registerTypePecuaria.forEach((unicRegister) => {
        registerOperationType(unicRegister);
    });
});

function registerOperationType(unicRegister) {
    it(`e2e - include an operation based on type ${unicRegister.type} 
            in client using documents in ${unicRegister.document}
            in culture ${unicRegister.culture}
            in archive ${unicRegister.archiveLocale}
            in client ${unicRegister.client} 
            in filial ${unicRegister.filial}`, () => {

        cy.getOperation();
        cy.registerInOperation();
        cy.getTypeBasead(unicRegister.type);
        cy.getFilial(unicRegister.filial);
        cy.startRegister();
        cy.registerOperation(unicRegister);
        cy.definedTypeInClientUser(unicRegister);
        cy.processGleba(unicRegister.archiveLocale);
    });
}