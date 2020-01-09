import React from 'react';
import { connect } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import blogService from '../services/blogs';
import { Form, Button, Input } from 'semantic-ui-react';

const BlogForm = props => {
  const userLoggedIn = window.localStorage.getItem('userLogIn');
  const user = JSON.parse(userLoggedIn);
  blogService.setToken(user.token);

  const newBlog = async event => {
    event.preventDefault();

    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    };
    event.target.title.value = '';
    event.target.author.value = '';
    event.target.url.value = '';
    props.createBlog(blogObject);
    props.setNotification(
      `You have added ${blogObject.title} by ${blogObject.author} to the list`,
      'info',
      100
    );
  };

  return (
    <div>
      <h2>Add a new blog post</h2>
      <Form onSubmit={newBlog}>
        <Form.Field>
          <label>Title:</label>
          <Input
            data-cy='title'
            type='text'
            name='title'
            placeholder='Blog Title'
          />
        </Form.Field>
        <Form.Field>
          <label>Author:</label>{' '}
          <Input
            data-cy='author'
            type='text'
            name='author'
            placeholder='Blog Author'
          />
        </Form.Field>
        <Form.Field>
          <label> Url:</label>{' '}
          <Input data-cy='url' type='text' name='url' placeholder='Blog Url' />
        </Form.Field>
        <div>
          <Button data-cy='save' color={'pink'} inverted type='submit'>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  createBlog,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogForm);
