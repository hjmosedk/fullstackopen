/* eslint-env node, es6 */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();
morgan.token('content', function(req, res) {
	return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(
	morgan(
		':method :url :status :res[content-length] - :response-time ms :content'
	)
);

const errorHandler = (error, req, res, next) => {
	console.error(error.message);

	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return res.status(400).send({ error: 'Malformatted id' });
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message });
	}

	next(error);
};

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'Unknown endpoint' });
};

app.get('/api/persons', (req, res) => {
	Person.find({}).then(persons => {
		res.json(persons.map(person => person.toJSON()));
	});
});

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then(person => {
			if (person) {
				res.json(person.toJSON());
			} else {
				res.status(404).end();
			}
		})
		.catch(error => next(error));
});

app.get('/info', (req, res) => {
	Person.countDocuments({}).then(count => {
		res.send(`Phonebook has info for ${count} people <br /><br />
	${new Date()}`);
	});
});

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then(result => {
			res.status(204).end();
		})
		.catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
	const name = req.body.name;
	const number = req.body.number;

	if (name === undefined) {
		return res.status(400).json({ error: 'Content missing' });
	}

	if (number === undefined) {
		return res.status(400).json({ error: 'Content missing' });
	}

	const person = new Person({
		name: name,
		number: number,
		date: new Date(),
	});

	person
		.save()
		.then(savedPerson => {
			res.json(savedPerson.toJSON());
		})
		.catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
	const person = {
		name: req.body.name,
		number: req.body.number,
	};

	Person.findByIdAndUpdate(req.params.id, person, { new: true })
		.then(updatedPerson => {
			res.json(updatedPerson.toJSON());
		})
		.catch(error => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server is online and running on ${PORT}`);
});
