const { ApolloServer, gql } = require('apollo-server')
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
        allBooks: (root, args) => {
            let filtered = Book.find({})

            if (args.author) {
                filtered = filtered.filter(book => book.author === args.author)
            }

            if (args.genre) {
                filtered = filtered.filter(book => book.genres.includes(args.genre))
            }
            return filtered
        },
        allAuthors: () => Author.find({})
    },
    Author: {
        bookCount: (root) => Book.find({}).filter((book) => book.author === root.name).length
    },
    Mutation: {
        addBook: async (root, args) => {
            console.log('In add book', args)
            let associatedAuthor = await Author.findOne({ name: args.author })

            if(!associatedAuthor) {
                console.log('No author found!')
                associatedAuthor = new Author({ name: args.author })
                await associatedAuthor.save()
            }

            console.log('AssociatedAuthor',associatedAuthor)
            const { author, ...withoutAuthor } = args
            const book = new Book({ ...withoutAuthor, author: associatedAuthor })
            await book.save()
        },
        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo
            await author.save()
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