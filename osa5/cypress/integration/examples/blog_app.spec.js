const user = {
  name: 'Tester',
  username: 'test',
  password: 'password'
}

const blog = {
  title: 'testiblogi',
  author: 'testaaja tunnus',
  url: 'https://www.gogle.fi'
}

const resetAndCreateUser = () => {
  cy.request('POST', 'http://localhost:3001/api/testing/reset')
  cy.request('POST', 'http://localhost:3001/api/users/', user)
  cy.visit('http://localhost:3000')
}

const signIn = () => {
  cy.get('input:first').type(user.username)
  cy.get('input[name="password"]').type(user.password)
  cy.get('#login-button').click()
}

const createBlog = () => {
  cy.contains('Create new blog').click()
  cy.get('#title').type(blog.title)
  cy.get('#author').type(blog.author)
  cy.get('#url').type(blog.url)

  cy.get('input[type="submit"]').click()
}

describe('Blog ', function() {
  beforeEach(function() {
    resetAndCreateUser()
  })
  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      signIn()
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

  describe('When logged in', function() {
    beforeEach(function() {
      signIn()
    })

    it('A blog can be created', function() {
      createBlog()

      cy.contains(blog.title)
      cy.contains(blog.author)
    })

    describe('When blogs have been created', function() {
      beforeEach(function() {
        createBlog()
      })

      it('A blog can be liked', function() {
        cy.contains(`${blog.title} ${blog.author}`).click()
        cy.contains('likes 0')
        cy.contains('Like').click()
        cy.contains('likes 1')
      })
    })
  })
})