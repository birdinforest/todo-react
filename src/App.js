import React, { Component } from 'react'
import TodoList from './components/TodoComponents/TodoList'
import TodoForm from './components/TodoComponents/TodoForm'
import Container from 'react-bootstrap/Container'
// import logo from './logo.svg'
// import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      todos: [],
      todo: ''
    }
  }

  // Listening to text changing in input field of TodoForm component.
  // Assign text value to property 'todo'.
  inputChangeHandler = event => {
    // event.target.name: todo
    // event.target.value: value of input field.
    this.setState({[event.target.name]: event.target.value})
  }

  // Create new task object based on property 'todo'.
  // Add new task into array property 'todos'
  addTask = event => {
    event.preventDefault()

    // Don't add empty todo.
    if (this.state.todo === '') {
      return
    }

    let newTask = {
      task: this.state.todo,
      id: Date.now().toString(),
      completed: false,
    }
    this.setState({
      // Immutability
      // Object spread syntax proposal
      // Same to: newObj = Object.assign({}, oriObj, propChanged: value)
      todos: [...this.state.todos, newTask],
      todo: ''    // Reset property 'todo' to be empty.
    })
  }

  toggleComplete = itemId => {
    // Array.prototype.map() return a new array.
    const todos = this.state.todos.map(item => {
      if (item.id === itemId) {
        item.completed = !item.completed
      }
      return item
    })

    this.setState({todos: todos})
  }

  addLocalStorage () {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key)
        try {
          value = JSON.parse(value)
          this.setState({[key]: value})
        } catch (e) {
          this.setState({[key]: value})
        }
      }
    }
  }

  saveLocalStorage () {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]))
    }
  }

  componentDidMount () {
    this.addLocalStorage()
    window.addEventListener(
      'beforeunload',
      this.saveLocalStorage.bind(this)
    )
  }

  componentWillUnmount () {
    window.removeEventListener(
      'beforeunload',
      this.saveLocalStorage.bind(this)
    )
  }

  render () {
    return (
      <div className='App'>
        <Container>
          <TodoForm
            todos={this.state.todos}
            value={this.state.todo}
            inputChangeHandler={this.inputChangeHandler}
            addTask={this.addTask}
          />
          <TodoList
            todos={this.state.todos}
            toggleComplete={this.toggleComplete}
          />
        </Container>
      </div>
    )
  };
}

export default App
