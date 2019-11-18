import React from 'react';

const Courses = ({ courses }) => {
	console.log(courses);

	const fullCourses = () =>
		courses.map(course => (
			<Coursecontent
				key={course.id}
				name={course.name}
				parts={course.parts}
			/>
		));

	return <div>{fullCourses()}</div>;
};

const Coursecontent = ({ name, parts }) => {
	console.log(name);
	console.log(parts);

	const total = parts.reduce((sum, part) => sum + part.exercises, 0);

	const courseContentHelper = () =>
		parts.map(part => (
			<Content
				key={part.id}
				name={part.name}
				exercises={part.exercises}
			/>
		));

	return (
		<div>
			<h2>
				<strong>{name}</strong>
			</h2>
			<ul>{courseContentHelper()}</ul>
			<Total total={total} />
		</div>
	);
};

const Content = ({ name, exercises }) => {
	console.log(name);

	return (
		<li>
			{name} {exercises}
		</li>
	);
};

const Total = ({ total }) => {
	console.log(total);
	return (
		<div>
			<strong>The total number of exercises is: {total}</strong>
		</div>
	);
};

export default Courses;
