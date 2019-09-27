import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = props => {
	return <button onClick={props.handleClick}>{props.text}</button>;
};

const HighestAnecdote = props => {
	const scoreToBeSorted = [...props.score];
	const score = [...props.score];
	const highestValue = scoreToBeSorted.sort((highValue, lowValue) =>
		highValue > lowValue ? -1 : 1
	);

	const mostVotes = score.findIndex(score => score === highestValue[0]);
	console.log(mostVotes);

	return (
		<div>
			<h1>Anecdote with most votes</h1>
			<p>
				{props.anecdotes[mostVotes]}
				<br />
				The Anecdote have been given {props.score[mostVotes]} votes!
			</p>
		</div>
	);
};

const App = props => {
	const [selected, setSelected] = useState(0);
	const [score, setScore] = useState(new Array(6).fill(0));

	const nextAnecdote = () => {
		setSelected(Math.floor(Math.random() * 6));
	};

	const vote = () => {
		const newScore = [...score];
		console.log(newScore);
		newScore[selected] += 1;
		setScore(newScore);
	};

	return (
		<div>
			<h1>Anecdote of the day</h1>
			{props.anecdotes[selected]}
			<br />
			The Anecdote have been given {score[selected]} votes!
			<br />
			<Button handleClick={vote} text='Vote for Anecdote' />
			<Button handleClick={nextAnecdote} text='Next Anecdote' />
			<HighestAnecdote score={score} anecdotes={anecdotes} />
		</div>
	);
};

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
