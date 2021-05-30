describe('Test Case: Check the password update page (student)', () => {
  it('Scenario: Access the password update page', () => {
    cy.visit('http://localhost:3000/');

    cy.get('#demo-simple-select-outlined').select('gec');
    cy.get(':nth-child(3) > .MuiInputBase-root > #outlined-uncontrolled').type(
      1369
    );
    cy.get(':nth-child(4) > .MuiInputBase-root > #outlined-uncontrolled').type(
      '123456'
    );

    cy.get('.styles_enterButton__25Z0x').click();

    cy.get(':nth-child(4) > a').click();

    cy.get('.styles_title__3vnqx > h1').should('contain.text', 'Perfil');
  });

  it('Scenario: Password update successfully', () => {
    cy.visit('http://localhost:3000/');

    cy.get('#demo-simple-select-outlined').select('gec');
    cy.get(':nth-child(3) > .MuiInputBase-root > #outlined-uncontrolled').type(
      1369
    );
    cy.get(':nth-child(4) > .MuiInputBase-root > #outlined-uncontrolled').type(
      '123456'
    );

    cy.get('.styles_enterButton__25Z0x').click();

    cy.get(':nth-child(4) > a').click();

    cy.get(':nth-child(1) > :nth-child(2) > input').type('123456');
    cy.get(':nth-child(2) > :nth-child(2) > input').type('1369');
    cy.get(':nth-child(3) > :nth-child(2) > input').type('1369');

    cy.get('button').click();

    cy.get('.styles_created__20Q73').should(
      'contain.text',
      'Senha atualizada com sucesso!'
    );

    cy.get('.styles_button__3tDLz').click();

    cy.get(':nth-child(1) > :nth-child(2) > input')
      .click()
      .clear()
      .type('1369');
    cy.get(':nth-child(2) > :nth-child(2) > input')
      .click()
      .clear()
      .type('123456');
    cy.get(':nth-child(3) > :nth-child(2) > input')
      .click()
      .clear()
      .type('123456');

    cy.get('button').click();
  });

  it('Scenario: Password update failure because the two input fields of the new password have different values', () => {
    cy.visit('http://localhost:3000/');

    cy.get('#demo-simple-select-outlined').select('gec');
    cy.get(':nth-child(3) > .MuiInputBase-root > #outlined-uncontrolled').type(
      1369
    );
    cy.get(':nth-child(4) > .MuiInputBase-root > #outlined-uncontrolled').type(
      '123456'
    );

    cy.get('.styles_enterButton__25Z0x').click();

    cy.get(':nth-child(4) > a').click();

    cy.get(':nth-child(1) > :nth-child(2) > input').type('123456');
    cy.get(':nth-child(2) > :nth-child(2) > input').type('1369');
    cy.get(':nth-child(3) > :nth-child(2) > input').type('123');

    cy.get('button').click();

    cy.get('.styles_errorInfo__3BYzc').should(
      'contain.text',
      'Senhas diferentes!'
    );
  });

  it('Scenario: Password update failure because the current password is wrong', () => {
    cy.visit('http://localhost:3000/');

    cy.get('#demo-simple-select-outlined').select('gec');
    cy.get(':nth-child(3) > .MuiInputBase-root > #outlined-uncontrolled').type(
      1369
    );
    cy.get(':nth-child(4) > .MuiInputBase-root > #outlined-uncontrolled').type(
      '123456'
    );

    cy.get('.styles_enterButton__25Z0x').click();

    cy.get(':nth-child(4) > a').click();

    cy.get(':nth-child(1) > :nth-child(2) > input').type('123');
    cy.get(':nth-child(2) > :nth-child(2) > input').type('1369');
    cy.get(':nth-child(3) > :nth-child(2) > input').type('1369');

    cy.get('button').click();

    cy.get('.styles_error__2L-ZR').should(
      'contain.text',
      'Não foi possível atualizar a senha!'
    );
  });
});
