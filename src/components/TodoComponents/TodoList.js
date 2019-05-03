import React from 'react'
import Todo from './Todo'

const TodoList = props => {
  return (
    <div>
      {
        props.todos.map((todo) => (
          <Todo
            task={todo.task}
            id={todo.id}
            key={todo.id}
            completed={todo.completed}
            toggleComplete={props.toggleComplete}
          />
        ))
      }
    </div>
  )
}

export default TodoList
