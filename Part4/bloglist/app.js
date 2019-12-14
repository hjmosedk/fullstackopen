const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blogs');
const usersRoute = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middelware = require('./utils/middelware');
const config = require('./utils/config');

const app = express();

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(result => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error connection to MongoDB:', error.message);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(middelware.tokenExtractor);
app.use(middelware.errorHandler);
app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRoute);
app.use('/api/login', loginRouter);

module.exports = app;
