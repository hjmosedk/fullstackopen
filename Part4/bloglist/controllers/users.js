const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/users');

usersRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request;

    if (!body.password) {
      return response.status(400).json({ error: 'Password is missing' });
    }

    if (body.password.length < 3) {
      return response.status(400).json({ error: 'Password is less then 3' });
    }

    const saltRounds = 15;
    const encrypedPassword = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      encrypedPassword,
    });

    const newUser = await user.save();

    response.json(newUser);
  } catch (exception) {
    next(exception);
  }
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    url: 1,
    author: 1,
    id: 1,
  });
  response.json(users.map(user => user.toJSON()));
});
module.exports = usersRouter;
