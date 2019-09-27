import React from 'react'
import ReactDOM from 'react-dom'
 
const Header = (props) => {
      return (
          <div>
              <h1>{props.course.name}</h1>
          </div>
    )
};


 const Content = (props) => {
    return (
        <div>
           <Part name={props.course.parts[0].name} exercises={props.course.parts[0].exercises}/>
           <Part name={props.course.parts[1].name} exercises={props.course.parts[1].exercises}/>
           <Part name={props.course.parts[2].name} exercises={props.course.parts[2].exercises}/>
        </div>
    )
} 

const Part = (props) => {
    return (
        <div>
            <p> {props.name} {props.exercises}</p>
        </div>
    )

}

const Total = (props) => {
    const part1 = props.course.parts[0].exercises
    const part2 = props.course.parts[1].exercises
    const part3 = props.course.parts[2].exercises
    return (
        <div>
            <p> Number of exercises {part1 + part2 + part3}</p>
        </div>
    )
}

const App = () => {
       
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }

    return (
        <div>
            <Header course = {course} />
            <Content course = {course} />
            <Total course= {course} />
        </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))