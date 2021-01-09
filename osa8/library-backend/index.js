const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const dotenv = require('dotenv')
dotenv.config()

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

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
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
  }
`
const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
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
        allAuthors: async () => await Author.find({}) || []
    },
    Author: {
        bookCount: async (root) => {
            const books = await Book.find({}).populate('author')
            console.log('In BookCount', books)
            if (!books) {
                return 0
            }
            return books.filter((book) => book.author.name === root.name).length
        }
    },
    Mutation: {
        addBook: async (root, args) => {
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

            const { author, ...withoutAuthor } = args
            const book = new Book({ ...withoutAuthor, author: associatedAuthor })

            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

        },
        editAuthor: async (root, args) => {
            if (!args.setBornTo) {
                throw new UserInputError('Cannot set null value to author\'s birth year', {
                    invalidArgs: args,
                })
            }
            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo

            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})