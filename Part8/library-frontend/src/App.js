import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import {
  useQuery,
  useMutation,
  useApolloClient,
  useSubscription,
} from 'react-apollo';
import { gql } from 'apollo-boost';

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
        born
      }
      published
      genres
      id
    }
  }
`;

const GET_AUTHORS = gql`
  query getAllAuthors {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

const GET_BOOKS = gql`
  query getAllBooks {
    allBooks {
      title
      author {
        name
        born
      }
      published
      genres
      id
    }
  }
`;

const GET_BOOKS_GENRA = gql`
  query getAllBooks($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
        born
      }
      published
      id
    }
  }
`;

const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
        born
      }
    }
  }
`;

const UPDATE_BIRTH = gql`
  mutation updateAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const ME = gql`
  query me {
    me {
      username
      favoriteGenre
    }
  }
`;

const App = () => {
  const [error, setError] = useState(null);
  const [page, setPage] = useState('');
  const [token, setToken] = useState(null);
  const [recomendation, setRecomendation] = useState(null);
  const [favGenra, setFavGenra] = useState(null);
  const authors = useQuery(GET_AUTHORS);
  const books = useQuery(GET_BOOKS);
  const me = useQuery(ME);
  const client = useApolloClient();

  useEffect(() => {
    setToken(localStorage.getItem('user'));
  });

  useEffect(() => {
    setFavGenra(me.loading ? [] : me.data.me.favoriteGenre);
  }, [me]);

  const filterQuery = async (client, genra) => {
    const filteredBooks = await client.query({
      query: GET_BOOKS_GENRA,
      variables: { genre: genra },
      fetchPolicy: 'no-cache',
    });
    return filteredBooks;
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ onSubscriptionData }) => {
      console.log(onSubscriptionData);
    },
  });

  const handleError = error => {
    setError(error.graphQLErrors[0].message);
    setTimeout(() => {
      setError(null);
    }, 10000);
  };
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage('books');
  };

  const handleRecomendationClick = async (client, favGenra) => {
    const recommendedBook = await filterQuery(client, favGenra);
    setRecomendation(recommendedBook.data.allBooks);
    setPage('recommendation');
  };

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: GET_BOOKS }, { query: GET_AUTHORS }],
  });

  const [updateAuthor] = useMutation(UPDATE_BIRTH, {
    onError: handleError,
    refetchQueries: [{ query: GET_BOOKS }, { query: GET_AUTHORS }],
  });

  const [login] = useMutation(LOGIN, {
    onError: handleError,
  });

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {!token ? (
          <span>
            <button onClick={() => setPage('login')}>Login</button>
          </span>
        ) : (
          <span>
            <button onClick={() => setPage('add')}>Add book</button>
            <button onClick={() => handleRecomendationClick(client, favGenra)}>
              Book Recommendation
            </button>
            <button onClick={logout}>Logout</button>
          </span>
        )}
      </div>

      <LoginForm
        show={page === 'login'}
        login={login}
        setToken={token => setToken(token)}
        setPage={setPage}
      />

      <Authors
        show={page === 'authors'}
        result={authors}
        update={updateAuthor}
      />

      <div>
        <div>
          <Books
            show={
              page === 'add' || page === 'books' || page === 'recommendation'
            }
            result={books}
            client={client}
            query={filterQuery}
            me={me}
            recomendation={recomendation}
            favGenra={favGenra}
            setPage={setPage}
            findRecomended={page === 'recommendation' ? true : false}
          />
        </div>
        <div>
          <NewBook show={page === 'add'} addBook={addBook} />
        </div>
      </div>
    </div>
  );
};

export default App;
