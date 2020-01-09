import React from 'react';
import { connect } from 'react-redux';

const User = props => {
  if (props.user === undefined) {
    return null;
  }

  return (
    <div>
      <h2>{props.user.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {props.user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default connect()(User);
