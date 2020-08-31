import React, {Component} from 'react'
import Header from './Header'
import MainSection from './MainSection'
import { v4 as uuidv4 } from 'uuid'
import Bottom from './Bottom'

const initialState = [{
    text: '',
    completed: false,
    id: 0
  }
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: initialState,
      ID: uuidv4,
    }
  }

  addTodo = (userinput) => {
    const todos = [{
        id: this.state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text: userinput
      },
      ...this.state.todos
    ]
    this.setState({todos})
  }

  deleteTodo = (id) => {
    const todos = this.state.todos.filter(todo => todo.id !== id)
    this.setState({todos})
  }

  editTodo = (id, newtext) => {
    const todos = this.state.todos.map(todo =>
        todo.id === id ? {...todo, newtext} : todo
    )
    this.setState({todos})
  }

  completeTodo = (id) => {
    const todos = this.state.todos.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo
    )
    this.setState({todos})
  }

  completeAll = () => {
    const areAllCompleted = this.state.todos.every(todo => todo.completed)
    const todos = this.state.todos.map(todo => {
      return {...todo, completed: !areAllCompleted}
    })
    this.setState({todos})
  }

  clearCompleted = () => {
    const todos = this.state.todos.filter(todo => todo.completed === false)
    this.setState({todos})
  }

  actions = {
    addTodo: this.addTodo,
    deleteTodo: this.deleteTodo,
    editTodo: this.editTodo,
    completeTodo: this.completeTodo,
    completeAll: this.completeAll,
    clearCompleted: this.clearCompleted
  }

  render() {
    return(
        <div>
          <h1>todos</h1>
          <Header addTodo={this.actions.addTodo} />
          <MainSection todos={this.state.todos} actions={this.actions} />
          <Bottom />
        </div>
    )
  }
}

export default App
