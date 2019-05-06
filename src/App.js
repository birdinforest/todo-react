import React, { Component } from 'react'
import TodoList from './components/TodoComponents/TodoList'
import TodoForm from './components/TodoComponents/TodoForm'
import Container from 'react-bootstrap/Container'
// import logo from './logo.svg'
// import './App.css'
import axios from 'axios'

const BASE_API_ADDRESS = 'https://general-api.herokuapp.com/manager/entries'

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

  // Create new content object based on property 'todo'.
  // Add new content into array property 'todos'
  addTask = event => {
    event.preventDefault()

    // Don't add empty todo.
    if (this.state.todo === '') {
      return
    }

    let newTask = {
      content: this.state.todo,
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

    this.postEntryToDb({content: newTask.content, completed: newTask.completed});
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

  /**
   * Get all entries from DB.
   * Structure of res:
   * {
   *   config:{},
   *   data:{
   *      data:[
   *      {
   *          _id:Number,
   *          content:String,
   *          location:String
   *          completed:Boolean
   *      },
   *      {}
   *      ],
   *      success: Boolean,
   *      [message: String]
   *   },
   *   headers:{}
   *   request:{}
   *   status: Number
   *   statusText: String
   * }
   */
  getAllEntriesFromDb () {
    axios.get(BASE_API_ADDRESS).then(res => {
      this.setState({todos: res.data.data})
    })
  }

  postEntryToDb (data) {
    axios.post(BASE_API_ADDRESS, data)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

    // Todo: If entry can't be posted to DB in any reason, cacher it in local storage
    //  and try to post later. Hence pop up a message to notice user.
  }

  componentDidMount () {
    // Todo:
    //  1.Read data from local storage.
    //  2. Register listener to save data to local storage.

    this.getAllEntriesFromDb()
  }

  componentWillUnmount () {
    // Todo:
    //  1.Remove listeners.
    //  2.Reset setting/variable.

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
