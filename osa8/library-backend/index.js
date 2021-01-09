const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const dotenv = require('dotenv')
dotenv.config()
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]!
  }

  type Subscription {
    bookAdded: Book!
  }    
type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      me: User
      allGenres: [String]
  }

type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
      ) : Book
      editAuthor(
          name: String!
          setBornTo: Int!
      ) : Author
      createUser(
        username: String!
        favoriteGenre: String!
      ): User
      login(
        username: String!
        password: String!
      ): Token
}

type User {
    username: String!
    id: ID!
    favoriteGenre: String!
}

type Token {
    value: String!
}
`
const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            console.log('In All Books!', root, args)
            let filtered = await Book.find({}).populate('author')

            if (!filtered) {
                return null
            }

            if (args.author) {
                filtered = filtered.filter(book => book.author.name === args.author)
            }

            if (args.genre) {
                filtered = filtered.filter(book => book.genres.includes(args.genre))
            }
            return filtered
        },
        allAuthors: async () => await Author.find({}) || [],
        me: (root, args, context) => {
            return context.currentUser
        },
        allGenres: async () => {
            const genres = await Book.find({}).select('genres -_id')
            return genres.reduce((a,b) => {
                return a.concat(b.genres.filter((item) => a.indexOf(item) === -1))
            }, [])
        }
    },
    Author: {
        bookCount: async (root) => {
            const books = await Book.find({}).populate('author')
            if (!books) {
                return 0
            }
            return books.filter((book) => book.author.name === root.name).length
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                throw new AuthenticationError('not authenticated')
            }
            let associatedAuthor = await Author.findOne({ name: args.author })

            if (!associatedAuthor) {
                associatedAuthor = new Author({ name: args.author })
                try {
                    await associatedAuthor.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }
            }

            // eslint-disable-next-line no-unused-vars
            const { author, ...withoutAuthor } = args
            const book = new Book({ ...withoutAuthor, author: associatedAuthor })

            pubsub.publish('BOOK_ADDED', { bookAdded: book })
            try {
                return await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

        },
        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                throw new AuthenticationError('not authenticated')
            }
            if (!args.setBornTo) {
                throw new UserInputError('Cannot set null value to author\'s birth year', {
                    invalidArgs: args,
                })
            }
            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo

            try {
                return await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
        createUser: (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError('wrong credentials')
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, process.env.SECRET_TOKEN) }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), process.env.SECRET_TOKEN
            )
            const currentUser = await User
                .findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})