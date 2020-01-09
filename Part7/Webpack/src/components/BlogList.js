import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const BlogList = props => {
  return (
    <Table color={'green'} striped>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <h2>Blogs</h2>
          </Table.Cell>
        </Table.Row>
        {props.visibleBlogs.map(blog => (
          <Table.Row key={blog.id}>
            <Table.Cell>
              <Link
                style={{ textDecoration: 'underline' }}
                to={`/blogs/${blog.id}`}
              >
                {blog.title}
              </Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const blogsToShow = ({ blogs }) => {
  return blogs.sort((a, b) => b.likes - a.likes);
};

const mapStateToProps = state => {
  return {
    visibleBlogs: blogsToShow(state),
  };
};

export default connect(mapStateToProps, null)(BlogList);
