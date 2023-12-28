describe('TextInputComponent', () => {
  it('should display error message on blur', () => {
    cy.visit('iframe.html?id=components-textinput--form');

    cy.get('#root').get('[id="username"]').should('be.visible');
    cy.get('#root').get('[id="password"]').should('be.visible');
    cy.get('#root').get('.submit').should('be.visible').click();

    cy.get('#root')
      .get('[id="username"]')
      .shadow()
      .find('.message')
      .contains('Error: Required, please enter a username.');
    cy.get('#root')
      .get('[id="password"]')
      .shadow()
      .find('.message')
      .contains(
        'Minimum length not met, please supply a value with at least 8 characters.'
      );
  });

  it('should not display error message when valid', () => {
    cy.visit('iframe.html?id=components-textinput--form');

    cy.get('#root')
      .get('[id="username"]')
      .shadow()
      .find('input')
      .type('jane@doe.com');
    cy.get('#root')
      .get('[id="password"]')
      .shadow()
      .find('input')
      .type('W3BC0mpon3nts!');

    cy.get('#root').get('.submit').should('be.visible').click();

    cy.get('#root')
      .get('[id="username"]')
      .shadow()
      .find('.message')
      .should('include.text', '');
    cy.get('#root')
      .get('[id="password"]')
      .shadow()
      .find('.message')
      .should('include.text', '');
  });
});
