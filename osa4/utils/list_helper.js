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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}