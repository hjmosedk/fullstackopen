/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'You need to give your blog a title'],
  },
  author: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  url: {
    type: String,
    required: [true, 'You need to include a URL in your blog'],
  },
  likes: { type: Number, default: 0 },
  comments: {
    type: Array,
    default: [],
  },
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
