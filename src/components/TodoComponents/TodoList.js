import React from 'react'
import Todo from './Todo'

const TodoList = props => {
  return (
    <div>
      {
        props.todos.map((todo) => (
          <Todo
            content={todo.content}
            id={todo._id}
            key={todo._id}
            completed={todo.completed}
            toggleComplete={props.toggleComplete}
          />
        ))
      }
    </div>
  )
}

export default TodoList
