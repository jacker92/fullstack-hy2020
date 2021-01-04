const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('viewing all blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
})

describe('viewing specific blog', () => {
    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')
        const title = response.body.map(r => r.title)

        expect(title).toContain(helper.initialBlogs[1].title)
    })

    test('a blog has id field', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(x => expect(x.id).toBeDefined())
    })

    test('a single blog can be retrieved', async () => {
        const blogs = await helper.blogsInDB()
        const blog = blogs[0]
        const response = await api
            .get(`/api/blogs/${blog.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toEqual(blog)
    })

    test('with invalid id returns 400', async () => {
        await api
            .get('/api/blogs/abc')
            .expect(400)
    })
    test('with not found id returns 404', async () => {
        await api
            .get('/api/blogs/5ff2f10e97ca813c709c6822')
            .expect(404)
    })

})

describe('blog is removed', () => {
    test('succeeds with 204', async () => {
        const blogsAtStart = await helper.blogsInDB()
        const blog = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blog.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDB()

        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

        const title = blogsAtEnd.map(r => r.title)

        expect(title).not.toContain(blog.title)
    })
})

describe('adding new blogs', () => {
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
        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

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
})

describe('updating a blog', () => {
    test('updating single blog should be successful', async () => {
        const blogsAtStart = await helper.blogsInDB()
        const blog = blogsAtStart[0]

        const newTitle = 'tester'
        blog.title = newTitle

        const result = await api
            .put(`/api/blogs/${blog.id}`)
            .send(blog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual(blog)
    })

    test('if blog with provided id not found then return 404', async () => {
        const newBlog = {
            id: '5ff2f10e97ca813c709c6822',
            author: 'Michael',
            title: 'React'
        }

        await api
            .put(`/api/blogs/${newBlog.id}`)
            .send(newBlog)
            .expect(404)
    })

    test('if blog with invalid id then return 400', async () => {
        const newBlog = {
            id: 'abc',
            author: 'Michael',
            title: 'React'
        }

        await api
            .put(`/api/blogs/${newBlog.id}`)
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})

afterAll(() => {
    mongoose.connection.close()
})