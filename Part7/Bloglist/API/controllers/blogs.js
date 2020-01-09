/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/users');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', async (request, response, next) => {
  const { body, token } = request;

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'Token Missing or Invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      user: user._id,
      url: body.url,
      likes: 0,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.json(savedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const { token } = request;
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'Token Missing or Invalid' });
    }

    const blogToDelete = await Blog.findById(request.params.id);
    if (blogToDelete.user.toString() === decodedToken.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      response
        .status(403)
        .json({ error: 'You are not authorized to remove this blog' });
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const newBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
      }
    );
    response.json(newBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const blogToUpdate = await Blog.findById(request.params.id);
    blogToUpdate.comments = blogToUpdate.comments.concat(request.body.comment);
    const savedBlog = await blogToUpdate.save();
    response.json(savedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
