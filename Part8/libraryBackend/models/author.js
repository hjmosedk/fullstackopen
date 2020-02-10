const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
});

schema.set('toJSON', {
  transform: function(orginalObject, newObject, options) {
    newObject.id = orginalObject._id;
    delete newObject._id;
    delete newObject.__v;
  },
});

module.exports = mongoose.model('Author', schema);
