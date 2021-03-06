/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/users');

loginRouter.post('/', async (request, response, next) => {
  const { body } = request;
  try {
    const user = await User.findOne({ username: body.username });
    const passwordIsGood =
      user === null
        ? false
        : await bcrypt.compare(body.password, user.encrypedPassword);

    if (!(user && passwordIsGood)) {
      return response
        .status(401)
        .json({ error: 'Invalid username or password' });
    }
    const userToken = { username: user.username, id: user._id };

    const token = jwt.sign(userToken, process.env.SECRET);

    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } catch (exception) {
    next(exception);
  }
});

module.exports = loginRouter;
