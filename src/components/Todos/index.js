import {Component} from 'react'
import {v4} from 'uuid'

import TodoItem from '../TodoItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Todos extends Component {
  state = {
    todoName: '',
    todoDescription: '',
    todosList: [],
  }

  deleteTodo = todoId => {
    const {todosList} = this.state

    this.setState({
      todosList: todosList.filter(each => each.id !== todoId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(eachTodo => {
        if (id === eachTodo.id) {
          return {...eachTodo, isLiked: !eachTodo.isLiked}
        }
        return eachTodo
      }),
    }))
  }

  renderTodosList = () => {
    const {todosList} = this.state

    return todosList.map(eachTodo => (
      <TodoItem
        key={eachTodo.id}
        todoDetails={eachTodo}
        toggleIsLiked={this.toggleIsLiked}
        deleteTodo={this.deleteTodo}
      />
    ))
  }

  onAddTodo = event => {
    event.preventDefault()
    const {todoName, todoDescription} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newTodo = {
      id: v4(),
      name: todoName,
      description: todoDescription,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      todosList: [...prevState.todosList, newTodo],
      todoName: '',
      todoDescription: '',
    }))
  }

  onChangeTodoName = event => {
    this.setState({
      todoName: event.target.value,
    })
  }

  onChangeTodoDescription = event => {
    this.setState({
      todoDescription: event.target.value,
    })
  }

  render() {
    const {todoName, todoDescription, todosList} = this.state

    return (
      <div className="app-container">
        <div className="todos-container">
          <h1 className="app-heading">Todos</h1>
          <div className="todos-inputs">
            <form className="form" onSubmit={this.onAddTodo}>
              <p className="form-description">Add Your Todo-lists</p>
              <input
                type="text"
                className="name-input"
                placeholder="Todo-name"
                value={todoName}
                onChange={this.onChangeTodoName}
              />
              <textarea
                placeholder="Todo-description"
                className="description-input"
                value={todoDescription}
                onChange={this.onChangeTodoDescription}
                rows="6"
              />
              <button type="submit" className="add-button">
                Add Todo
              </button>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="comments"
            />
          </div>
          <hr className="line" />
          <p className="heading">
            <span className="Todos-count">{todosList.length}</span>
            Todos
          </p>
          <ul className="todos-list">{this.renderTodosList()}</ul>
        </div>
      </div>
    )
  }
}

export default Todos
