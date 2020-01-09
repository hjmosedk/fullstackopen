const Blog = require('../models/blog');
const Users = require('../models/users');

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
];

const newBlog = {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url:
    'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
};

const initalUsers = [
  {
    username: 'root',
    name: 'SuperUser',
    password: '123456789',
  },
  {
    username: 'test',
    name: 'SuperUser2',
    password: 'Secret',
  },
];
const newUser = {
  username: 'NewUser',
  name: 'The New User',
  passwpasswordrod: 'thisisanewpassword',
};

const blogsInDatabase = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDataBase = async () => {
  const users = await Users.find({});
  return users.map(user => user.toJSON());
};
module.exports = {
  initialBlogs,
  blogsInDatabase,
  newBlog,
  usersInDataBase,
  initalUsers,
  newUser,
};
