const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('../utils/backend_test_helpers');

const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/users');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObject = helper.initialBlogs.map(blog => new Blog(blog));
  await Promise.all(blogObject.map(blog => blog.save()));
});

describe('Finding data in the Database:', () => {
  test('Blogs is return in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/);

    const blogonServer = await helper.blogsInDatabase();
    expect(blogonServer.length).toBe(helper.initialBlogs.length);
  });

  test('All blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body.length).toBe(helper.initialBlogs.length);
  });

  test('Id is defined for all users', async () => {
    const response = await api.get('/api/blogs');
    const ids = response.body.map(blog => blog.id);
    expect(ids).toBeDefined();
  });
});

describe('Adding new blogs:', () => {
  test('A new blog is added succesfully', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAfterUpdate = await helper.blogsInDatabase();
    expect(blogsAfterUpdate.length).toBe(helper.initialBlogs.length + 1);

    const title = blogsAfterUpdate.map(m => m.title);
    expect(title).toContain('Go To Statement Considered Harmful');
  });

  test('Likes deafults to 0', async () => {
    const zeroLikeblog = helper.newBlog;
    delete zeroLikeblog.likes;

    await api
      .post('/api/blogs')
      .send(zeroLikeblog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAfterUpdate = await helper.blogsInDatabase();
    expect(blogsAfterUpdate.length).toBe(helper.initialBlogs.length + 1);

    const findLike = blogsAfterUpdate[blogsAfterUpdate.length - 1].likes;
    expect(findLike).toBe(0);
  });

  test('Url or Title missing must throw 400 error', async () => {
    const noTitleBlog = helper.newBlog;
    delete noTitleBlog.title;
    const noUrlblog = helper.newBlog;
    delete noUrlblog.url;

    await api
      .post('/api/blogs')
      .send(noTitleBlog)
      .expect(400);

    await api
      .post('/api/blogs')
      .send(noUrlblog)
      .expect(400);

    const blogsAfterUpdate = await helper.blogsInDatabase();
    expect(blogsAfterUpdate.length).toBe(helper.initialBlogs.length);
  });
});

describe('Blogs is correctly delete', () => {
  test('Blog is deleted correctly', async () => {
    const dataBaseStatus = await helper.blogsInDatabase();
    const blogsToDelete = dataBaseStatus[0];

    await api.delete(`/api/blogs/${blogsToDelete.id}`).expect(204);

    const dataBaseStatusAtend = await helper.blogsInDatabase();
    expect(dataBaseStatusAtend.length).toBe(helper.initialBlogs.length - 1);

    const title = dataBaseStatusAtend.map(b => b.title);

    expect(title).not.toContain(blogsToDelete.title);
  });
});

describe('Blog is updates', () => {
  test('Likes is updated', async () => {
    const dataBaseStatus = await helper.blogsInDatabase();
    const blogToUpdate = dataBaseStatus[0];
    delete blogToUpdate.likes;

    const blogsObject = { ...blogToUpdate, likes: 25 };
    await api
      .put(`/api/blogs/${blogsObject.id}`)
      .send(blogsObject)
      .expect(200);

    const dataBaseStatusAtend = await helper.blogsInDatabase();
    expect(dataBaseStatusAtend.length).toBe(helper.initialBlogs.length);

    const correctLikes = await dataBaseStatusAtend.map(l => l.likes);
    expect(correctLikes).toContain(blogsObject.likes);
  });
});

describe('User testing for the API', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const userObject = helper.initalUsers.map(user => new User(user));
    await Promise.all(userObject.map(user => user.save()));
  });

  test('User is returned in JSON', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-type', /application\/json/);

    const userDataStatus = await helper.usersInDataBase();
    expect(userDataStatus.length).toBe(helper.initalUsers.length);

    const username = userDataStatus.map(u => u.username);
    expect(username).toContain('root');
  });

  test('New user is created correctly', async () => {
    const dbStatusAtStart = await helper.usersInDataBase();

    const newUser = {
      username: 'chaosmaster',
      name: 'Christian Kubel Højmose',
      password: 'test1234',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-type', /application\/json/);

    const dbStatusAtEnd = await helper.usersInDataBase();
    expect(dbStatusAtEnd.length).toBe(dbStatusAtStart.length + 1);

    const usernames = dbStatusAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('Password is less then 3', async () => {
    const newUser = {
      username: 'hjmose',
      name: 'Christian Kubel Højmose',
      password: '14',
    };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400, { error: 'Password is less then 3' });

    const dataBaseStatusAtend = await helper.usersInDataBase();
    expect(dataBaseStatusAtend.length).toBe(helper.initalUsers.length);
  });

  test('A user without password cannot be created', async () => {
    const withOutPassword = {
      username: 'hjmose',
      name: 'Christian Kubel Højmose',
    };

    await api
      .post('/api/users')
      .send(withOutPassword)
      .expect(400, { error: 'Password is missing' });

    const dataBaseStatusAtend = await helper.usersInDataBase();
    expect(dataBaseStatusAtend.length).toBe(helper.initalUsers.length);
  });

  test('A username must be defined', async () => {
    const withOutUsername = {
      name: 'Christian Kubel Højmose',
      password: 'test1234',
    };

    await api
      .post('/api/users')
      .send(withOutUsername)
      .expect(400, {
        error: 'User validation failed: username: Path `username` is required.',
      });

    const dataBaseStatusAtend = await helper.usersInDataBase();
    expect(dataBaseStatusAtend.length).toBe(helper.initalUsers.length);
  });

  test('Username must be more then 3', async () => {
    const withShortUsername = {
      username: 'hj',
      name: 'Christian Kubel Højmose',
      password: 'test1234',
    };

    await api
      .post('/api/users')
      .send(withShortUsername)
      .expect(400, {
        error:
          'User validation failed: username: Path `username` (`hj`) is shorter than the minimum allowed length (3).',
      });
    const dataBaseStatusAtend = await helper.usersInDataBase();
    expect(dataBaseStatusAtend.length).toBe(helper.initalUsers.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
