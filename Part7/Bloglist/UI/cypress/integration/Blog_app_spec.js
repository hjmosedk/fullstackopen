describe('Blog App test', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/test/reset');

    const user = {
      name: 'Emma Kubel Højmose',
      username: 'emma',
      password: 'Maja_1234',
    };

    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get('[data-cy=username]').type('emma');
    cy.get('[data-cy=password]').type('Maja_1234');
    cy.get('[data-cy=login]').click();
    cy.get('[data-cy=newBlog]').click();
    cy.get('[data-cy=title]').type('The rule of two');
    cy.get('[data-cy=author]').type('Cypress');
    cy.get('[data-cy=url]').type('hjmose.dk');
    cy.get('[data-cy=save]').click();
    cy.get('[data-cy=cancel]').click();
  });

  it('Front page can be opend', function() {
    cy.contains('Log in to application');
  });

  it('The application can be logged into,', function() {
    cy.contains('Emma Kubel Højmose has logged in');
  });

  it('A blog can be added to the application', function() {
    cy.contains('The rule of two');
  });

  it('A blog can be opned', function() {
    cy.get('Table').within(() => {
      cy.contains('The rule of two').click();
    });
    cy.contains('0 likes');
    cy.get('[data-cy=like]').click();
    cy.contains('1 likes');
  });

  it.only('A comment can be added', function() {
    cy.get('Table').within(() => {
      cy.contains('The rule of two').click();
    });
    cy.get('[data-cy=comment]').type('This is a comment by cypress');
    cy.get('[data-cy=addComment]').click();
    cy.contains('This is a comment by cypress');
  });
});
