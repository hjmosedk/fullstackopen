import React from 'react';
import { connect } from 'react-redux';
import { removeBlog, addLikes, addComment } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { Form, Button, Input } from 'semantic-ui-react';

const Blog = props => {
  const handleLikes = async () => {
    const updatedBlog = { ...props.blog };
    updatedBlog.likes += 1;
    updatedBlog.user = props.blog.user.id;
    props.addLikes(updatedBlog, updatedBlog.id);
  };
  const handleRemove = () => {
    window.confirm(
      `Do you really want to remove ${props.blog.title} by ${props.blog.author}?`
    );
    props.removeBlog(props.blog.id);
    props.setNotification(
      `${props.blog.title} have been succesfully removed`,
      'info',
      10
    );
  };

  const addComment = event => {
    event.preventDefault();
    const commentObject = { comment: event.target.comment.value };
    const id = props.blog.id;
    props.addComment(id, commentObject);
    event.target.comment.value = '';
  };

  if (props.blog === undefined) {
    return null;
  }

  return (
    <div>
      <h2>
        {props.blog.title} by {props.blog.author}
      </h2>
      <a href={props.blog.url}>{props.blog.url}</a>
      <br />
      {props.blog.likes} likes{' '}
      <Button
        data-cy='like'
        compact
        circular
        size={'small'}
        color={'blue'}
        onClick={handleLikes}
      >
        Like
      </Button>
      <br />
      <p>Added by: {props.blog.user.name || props.user.name}</p>
      <div style={{ paddingRight: 15, paddingTop: 15, paddingBottom: 15 }}>
        {props.user.username === props.blog.user.username && (
          <Button color={'red'} onClick={handleRemove}>
            Remove blog
          </Button>
        )}
      </div>
      <div>
        <h3>Comments</h3>
        <Form onSubmit={addComment}>
          <Input data-cy='comment' name='comment' />
          <Button data-cy='addComment' color={'green'} type='submit'>
            Add Comment
          </Button>
        </Form>
        <ul>
          {props.blog.comments.map(comment => (
            <li key={comment.length * Math.random() * 25000}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  removeBlog,
  addLikes,
  setNotification,
  addComment,
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
