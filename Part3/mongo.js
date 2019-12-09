const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log('Give a password as argument');
	process.exit(1);
}

const name = process.argv[3];
const number = process.argv[4];
const password = process.argv[2];

const url = `mongodb+srv://Fullstack:${password}@fullstackopen-qesiq.azure.mongodb.net/test?retryWrites=true&w=majority`;

/* eslint-env node, es6 */
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
	date: Date,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv[4] != undefined) {
	const person = new Person({
		name: name,
		number: number,
		date: new Date(),
	});

	console.log(process.argv[3]);
	person.save().then(response => {
		console.log(
			`Added ${person.name} with number: ${person.number} to the phonebook`
		);
		mongoose.connection.close();
	});
}

if (process.argv[4] === undefined) {
	Person.find({}).then(outcome => {
		outcome.forEach(person => {
			console.log(person);
		});
		mongoose.connection.close();
	});
}
