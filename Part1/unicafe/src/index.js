import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = props => (
	<button onClick={props.handleClick}>{props.text}</button>
);

const StatisticsCombined = props => {
	if (props.value[3] !== 0) {
		return (
			<div>
				<h1>Statistics</h1>
				<table>
					<tbody>
						<Statistics text='Good' value={props.value[0]} />
						<Statistics text='Neutral' value={props.value[1]} />
						<Statistics text='Bad' value={props.value[2]} />
						<Statistics text='All' value={props.value[3]} />
						<Statistics text='Average' value={props.value[4]} />
						<Statistics
							text='Positive'
							value={props.value[5]}
							string='%'
						/>
					</tbody>
				</table>
			</div>
		);
	}

	return (
		<div>
			<h1>Statistics</h1>
			<p>
				There have been given no feedback so far - Push a button to see
				the feedback!
			</p>
		</div>
	);
};

const Statistics = props => {
	return (
		<tr>
			<td>{props.text}</td>
			<td>
				{props.value} {props.string}
			</td>
		</tr>
	);
};

const App = () => {
	// save clicks of each button to own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [average, setAverage] = useState(0);
	const [total, setTotal] = useState(0);

	const setGoodFeedback = () => {
		setGood(good + 1);
		setAverage(average + 1);
		setTotal(total + 1);
	};

	const setNeutralFeedback = () => {
		setNeutral(neutral + 1);
		setTotal(total + 1);
	};

	const setBadFeedback = () => {
		setBad(bad + 1);
		setAverage(average - 1);
		setTotal(total + 1);
	};
	return (
		<div>
			<h1>Give Feedback</h1>
			<div>
				<Button handleClick={setGoodFeedback} text='Good' />
				<Button handleClick={setNeutralFeedback} text='Neutral' />
				<Button handleClick={setBadFeedback} text='Bad' />
			</div>
			<StatisticsCombined
				value={[
					good,
					neutral,
					bad,
					total,
					average / total,
					(good / total) * 100,
				]}
			/>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
