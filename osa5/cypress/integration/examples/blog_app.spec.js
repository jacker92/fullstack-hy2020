const user = {
  name: 'Tester',
  username: 'test',
  password: 'password'
}

describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })


  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type(user.username)
      cy.get('input[name="password"]').type(user.password)
      cy.get('#login-button').click()
      cy.contains('Blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('wrong')
      cy.get('input[name="password"]').type('wrong')
      cy.get('#login-button').click()
      cy.contains('Log in to application')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').contains('invalid username or password')
    })

  })

})