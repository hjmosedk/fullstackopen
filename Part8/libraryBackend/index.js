const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server');
const { PubSub } = require('apollo-server');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const jwt = require('jsonwebtoken');

const pubsub = new PubSub();
const SECRET_FOR_JWT = 'MAJA_IS_THE_HOTTEST_WIFEY';

const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const MONGODB_URI =
  'mongodb+srv://Fullstack:ZenvaRocks@fullstackopen-qesiq.azure.mongodb.net/library-app?retryWrites=true&w=majority';

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conneted to MongoDD');
  })
  .catch(error => {
    console.log('Error connection to MongoDB:'.error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User

    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      try {
        if (args.author === undefined && args.genre === undefined) {
          const books = await Book.find({}).populate('author');
          return books;
        }

        if (args.author === undefined && args.genre != undefined) {
          const books = await Book.find({
            genres: { $all: [args.genre] },
          }).populate('author');

          return books;
        }

        if (args.genre === undefined && args.author != undefined) {
          return books.filter(b => args.author === b.author);
        }

        const sortByAuthor = books.filter(b => args.author === b.author);
        const sortByGenreAndAutor = sortByAuthor.filter(b =>
          b.genres.includes(args.genre)
        );
        return sortByGenreAndAutor;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: root => {
      return Book.countDocuments({ author: root });
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Access Denied');
      }

      const findCorrectAuthor = await Author.findOne({ name: args.author });
      if (!findCorrectAuthor) {
        const author = new Author({ name: args.author });
        try {
          const newAuthor = await author.save();
          const book = new Book({ ...args, author: author._id });
          const newBook = await book.save();
          const authorAndBook = new Author({
            ...newAuthor,
            Books: [newBook._id],
          });
          await authorAndBook.save();
          const bookWithAuthor = await Book.populate(savedBook, {
            path: 'author',
          });

          pubsub.publish('BOOK_ADDED', { bookAdded: bookWithAuthor });

          return bookWithAuthor;
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }
      try {
        const authorIsKnown = findCorrectAuthor.toJSON();
        const book = new Book({ ...args, author: authorIsKnown.id });
        const newBook = await book.save();
        await Author.findByIdAndUpdate(authorIsKnown.id, {
          ...authorIsKnown,
          book: Array.isArray(authorIsKnown.books)
            ? [...authorIsKnown.books, newBook._id]
            : [newBook._id],
        });
        const bookAndAuthor = await Book.populate(newBook, { path: 'author' });
        pubsub.publish('BOOK_ADDED', { bookAdded: newBook });
        return newBook;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Access Denied');
      }

      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      );
      if (!author) {
        return null;
      }

      return author;
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'Password') {
        throw new UserInputError('Wrong Credentials');
      }

      const userTokenPrep = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userTokenPrep, SECRET_FOR_JWT) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), SECRET_FOR_JWT);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
