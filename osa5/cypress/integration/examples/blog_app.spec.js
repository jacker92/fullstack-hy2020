const user = {
  name: 'Tester',
  username: 'test',
  password: 'password'
}

const user2 = {
  name: 'Tester2',
  username: 'test2',
  password: 'password2'
}

const blog = {
  title: 'testiblogi',
  author: 'testaaja tunnus',
  url: 'https://www.gogle.fi'
}

const resetAndCreateUsers = () => {
  cy.request('POST', 'http://localhost:3001/api/testing/reset')
  cy.request('POST', 'http://localhost:3001/api/users/', user)
  cy.request('POST', 'http://localhost:3001/api/users/', user2)
  cy.visit('http://localhost:3000')
}

const signIn = (usr) => {
  cy.get('input:first').type(usr.username)
  cy.get('input[name="password"]').type(usr.password)
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
    resetAndCreateUsers()
  })
  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      signIn(user)
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
      signIn(user)
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

      it('A blog can be removed', function() {
        cy.contains(`${blog.title} ${blog.author}`).click()
        cy.contains('Remove').click()
        cy.should('not.contain', `${blog.title} ${blog.author}`)
      })

      it('Blog created by another user cannot be removed', function() {
        cy.contains('Logout').click()
        signIn(user2)
        cy.contains(`${blog.title} ${blog.author}`).click()
        cy.should('not.contain', 'Remove')
      })
    })
  })
})