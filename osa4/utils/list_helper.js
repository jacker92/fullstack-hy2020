const lodash = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, next) => {
        return sum + next.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    const index = blogs
        .reduce((iMax, x, i, arr) => x.likes > arr[iMax].likes ? i : iMax, 0)

    const obj = blogs[index]
    return {
        title: obj.title,
        author: obj.author,
        likes: obj.likes
    }
}

const mostBlogs = (blogs) => {
    const group = lodash.groupBy(blogs, 'author')
    const authorsWithSumOfBlogs = lodash.map(lodash.keys(group), (e) => {
        return { author: e, blogs: group[e].length }
    })

    return lodash.maxBy(authorsWithSumOfBlogs, (x) => {
        return x.blogs
    })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}