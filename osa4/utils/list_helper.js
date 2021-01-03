// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, next) => {
        return sum + next.likes
    }, 0)
}

module.exports = {
    dummy,
    totalLikes
}