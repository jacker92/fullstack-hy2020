const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const blogs = [{
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
},
{
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
}]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(blogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const title = response.body.map(r => r.title)

    expect(title).toContain(blogs[1].title)
})

test('a blog has id field', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(x => expect(x.id).toBeDefined())
})

test('adding a blog will increase blog count by one', async () => {
    const newBlog = {
        title: 'React',
        author: 'Michael',
        url: 'https://google.com/',
        likes: 7111
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogs.length + 1)

    const title = response.body.map(r => r.title)

    expect(title).toContain(newBlog.title)
})

test('adding a blog with no likes will set likes to 0', async () => {
    const newBlog = {
        title: 'React',
        author: 'Michael',
        url: 'https://google.com/'
    }

    const createdObject = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const value = response.body.find(x => x.id === createdObject.body.id)
    expect(value.likes).toBe(0)
})

test('adding a blog with no title or url will return 400', async () => {
    const newBlog = {
        author: 'Michael'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

})

test('adding a blog with no title will return 400', async () => {
    const newBlog = {
        author: 'Michael',
        url: 'https://www.google.fi'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

})

test('adding a blog with no url will return 400', async () => {
    const newBlog = {
        author: 'Michael',
        title: 'React'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

})

afterAll(() => {
    mongoose.connection.close()
})