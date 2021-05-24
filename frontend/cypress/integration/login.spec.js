describe('Test Case: Check the login page', () => {
  it('Scenario: Access the login page', () => {
    cy.visit('http://localhost:3000/');

    cy.get('p').should('contain.text', 'Portal Acadêmico');
  });

  it('Scenario: Student login successfully', () => {
    cy.visit('http://localhost:3000/');

    cy.get('#demo-simple-select-outlined').select('gec');
    cy.get(':nth-child(3) > .MuiInputBase-root > #outlined-uncontrolled').type(
      1369
    );
    cy.get(':nth-child(4) > .MuiInputBase-root > #outlined-uncontrolled').type(
      '123456'
    );

    cy.get('.styles_enterButton__25Z0x').click();

    cy.get('.styles_error__232Qu').should('not.exist');
    cy.url().should('eq', 'http://localhost:3000/aluno');
  });

  it('Scenario: Student login failure', () => {
    cy.visit('http://localhost:3000/');

    cy.get('#demo-simple-select-outlined').select('gea');
    cy.get(':nth-child(3) > .MuiInputBase-root > #outlined-uncontrolled').type(
      1369
    );
    cy.get(':nth-child(4) > .MuiInputBase-root > #outlined-uncontrolled').type(
      '1369'
    );

    cy.get('.styles_enterButton__25Z0x').click();

    cy.get('.styles_error__232Qu').should(
      'contain.text',
      'Usuário e/ou senha incorretos!'
    );
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('Scenario: Access teacher login', () => {
    cy.visit('http://localhost:3000/');

    cy.get('.styles_loginButton__2UKci > :nth-child(2)').click();

    cy.get('.styles_loginButton__2UKci > :nth-child(2)').should(
      'have.css',
      'color',
      'rgb(51, 51, 51)'
    );

    cy.get(
      ':nth-child(1) > .MuiInputBase-root > #outlined-uncontrolled'
    ).should('exist');
  });

  it('Scenario: Teacher login successfully', () => {
    cy.visit('http://localhost:3000/');

    cy.get('.styles_loginButton__2UKci > :nth-child(2)').click();

    cy.get(':nth-child(1) > .MuiInputBase-root > #outlined-uncontrolled').type(
      123
    );
    cy.get(
      '[style="margin-top: 45px;"] > .MuiInputBase-root > #outlined-uncontrolled'
    ).type('123456');

    cy.get('.styles_enterButton__25Z0x').click();

    cy.get('.styles_error__232Qu').should('not.exist');
    cy.url().should('eq', 'http://localhost:3000/professor');
  });

  it('Scenario: Teacher login failure', () => {
    cy.visit('http://localhost:3000/');

    cy.get('.styles_loginButton__2UKci > :nth-child(2)').click();

    cy.get(':nth-child(1) > .MuiInputBase-root > #outlined-uncontrolled').type(
      123
    );
    cy.get(
      '[style="margin-top: 45px;"] > .MuiInputBase-root > #outlined-uncontrolled'
    ).type('123');

    cy.get('.styles_enterButton__25Z0x').click();

    cy.get('.styles_error__232Qu').should(
      'contain.text',
      'Usuário e/ou senha incorretos!'
    );
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('Scenario: Access admin login', () => {
    cy.visit('http://localhost:3000/');

    cy.get('.styles_loginButton__2UKci > :nth-child(3)').click();

    cy.get('.styles_loginButton__2UKci > :nth-child(3)').should(
      'have.css',
      'color',
      'rgb(51, 51, 51)'
    );
    cy.get('.styles_loginButton__2UKci > :nth-child(3)').should('exist');
  });

  it('Scenario: Admin login successfully', () => {
    cy.visit('http://localhost:3000/');

    cy.get('.styles_loginButton__2UKci > :nth-child(3)').click();

    cy.get(':nth-child(1) > .MuiInputBase-root > #outlined-uncontrolled').type(
      123
    );
    cy.get(
      '[style="margin-top: 45px;"] > .MuiInputBase-root > #outlined-uncontrolled'
    ).type('123456');

    cy.get('.styles_enterButton__25Z0x').click();

    cy.get('.styles_error__232Qu').should('not.exist');
    cy.url().should('eq', 'http://localhost:3000/funcionario');
  });

  it('Scenario: Admin login failure', () => {
    cy.visit('http://localhost:3000/');

    cy.get('.styles_loginButton__2UKci > :nth-child(3)').click();

    cy.get(':nth-child(1) > .MuiInputBase-root > #outlined-uncontrolled').type(
      123
    );
    cy.get(
      '[style="margin-top: 45px;"] > .MuiInputBase-root > #outlined-uncontrolled'
    ).type('123');

    cy.get('.styles_enterButton__25Z0x').click();

    cy.get('.styles_error__232Qu').should(
      'contain.text',
      'Usuário e/ou senha incorretos!'
    );
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
