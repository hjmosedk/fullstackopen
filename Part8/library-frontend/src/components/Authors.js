import React from 'react';
import Birtform from './BirthForm';

const Authors = props => {
  if (!props.show) {
    return null;
  }

  if (props.result.loading) {
    return <div>Loading...</div>;
  }

  const authors = props.result.loading ? [] : props.result.data.allAuthors;

  return (
    <div>
      <div>
        <h2>Authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>Born</th>
              <th>Books</th>
            </tr>
            {props.result.data.allAuthors.map(a => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Birtform authors={authors} update={props.update} />
      </div>
    </div>
  );
};

export default Authors;
