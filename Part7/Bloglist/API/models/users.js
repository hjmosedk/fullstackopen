/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  name: String,
  encrypedPassword: String,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.encrypedPassword;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
