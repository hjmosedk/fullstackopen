import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';

const Users = props => {
  return (
    <div>
      <Table color={'blue'} striped inverted>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <h2>Users</h2>
            </Table.Cell>
            <Table.Cell> </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell> </Table.Cell>
            <Table.Cell>
              <h3>Blogs Created</h3>
            </Table.Cell>
          </Table.Row>
          {props.users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <Link
                  style={{ textDecoration: 'underline', color: 'white' }}
                  to={`/users/${user.id}`}
                >
                  {user.name}
                </Link>
              </Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <h2> </h2>
      <div></div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps, null)(Users);
