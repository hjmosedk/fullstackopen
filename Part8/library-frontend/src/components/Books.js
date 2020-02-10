import React, { useState, useEffect } from 'react';
import GenraForm from './GenraForm';

const Books = props => {
  const [bookList, setBooklist] = useState([]);
  const [bookFilter, setBookFilter] = useState([]);
  const [genraList, setGenraList] = useState([]);
  // const [recomendation, setRecomendation] = useState(null);
  //const [favGenra, setFavGenra] = useState(null);
  const [genra, setGenra] = useState('NONE');

  //useEffect(() => {
  //  setFavGenra(props.me.loading ? [] : props.me.data.me.favoriteGenre);
  //}, [props.me]);

  useEffect(() => {
    setBooklist(props.result.loading ? [] : props.result.data.allBooks);
  }, [props.result]);

  useEffect(() => {
    const mapGenres = bookList.reduce((a, b) => {
      return a.concat(b.genres);
    }, []);
    setGenraList(Array.from(new Set(mapGenres)));
    setBookFilter(bookList);
  }, [bookList]);

  if (!props.show) {
    return null;
  }

  if (props.result.loading) {
    return <div>Loading...</div>;
  }

  const handleClick = async (client, genra) => {
    const filteredBooks = await props.query(client, genra);
    setBookFilter(filteredBooks.data.allBooks);
    setGenra(genra.toUpperCase());
  };

  const reset = () => {
    setBookFilter(props.result.data.allBooks);
    setGenra('NONE');
    props.setPage('books');
  };

  let showlist = '';
  props.findRecomended
    ? (showlist = props.recomendation)
    : (showlist = bookFilter);

  return (
    <div>
      <h2>Books</h2>
      <p>
        The books are currently filtered after:{' '}
        <b>{props.findRecomended ? props.favGenra.toUpperCase() : genra}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <td>
              <div>
                <button
                  onClick={() => {
                    reset();
                  }}
                >
                  Reset filter
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {showlist.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <GenraForm
          genraList={genraList}
          handleClick={handleClick}
          client={props.client}
        />
      </div>
    </div>
  );
};

export default Books;
