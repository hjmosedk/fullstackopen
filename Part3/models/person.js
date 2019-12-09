/* eslint-env node, es6 */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false);

const url = process.env.MONGODB_URI;

mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(result => {
		console.log('Connected to MongoDB');
	})
	.catch(error => {
		console.log('Error connection to MongoDB:', error.message);
	});

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		required: true,
		unique: true,
		uniqueCaseInsensitive: true,
	},
	number: {
		type: String,
		required: true,
		minlength: 8,
	},
	date: {
		type: Date,
		required: true,
	},
});

personSchema.plugin(uniqueValidator, {
	message: 'Error, expected {VALUE} to be unique',
});

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.date;
	},
});

module.exports = mongoose.model('Person', personSchema);
