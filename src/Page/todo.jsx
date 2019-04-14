import React from 'react'
import {connect} from 'react-redux'
import {getTodo, setTodo} from '../Redux/action'
import TodoCard from '../Component/Todo'

import style from './style.module.scss'

class Todo extends React.Component {
  constructor (props) {
    super(props)
    this.addTodo = this.addTodo.bind(this)
  }
  componentDidMount () {
    this.props.getTodo()
  }
  addTodo (e) {
    let keyCode = e.keyCode
    let value = e.target.value
    if (keyCode === 13 && value !== '') {
      this.props.setTodo(value)
      e.target.value = ''
    }
  }
  render () {
    return (
      <div className={style.container}>
        <div className={style.input}>
          <input
            className={style.inputField}
            placeholder='write down your task'
            onKeyDown={(e) => this.addTodo(e)}
          />
        </div>
        {
          this.props.todos
            .filter(
              pair => (this.props.type === 0 ||
              (!pair[1].complete && this.props.type === 1) ||
              (pair[1].complete && this.props.type === 2))
            )
            .sort(
              (a, b) => parseInt(b[0], 16) - parseInt(a[0], 16)
            )
            .map(
              pair =>
                <TodoCard
                  key={pair[0]}
                  todoid={pair[0]}
                  completed={pair[1].complete}
                  title={pair[1].title}
                />
            )
        }
      </div>
    )
  }
}

const mapState2Props = state => ({
  type: state.type,
  todos: Object.entries(state.todos)
})

const mapDispatch2Props = dispatch => ({
  getTodo: () => dispatch(getTodo()),
  setTodo: (title) => dispatch(setTodo(title))
})

export default connect(mapState2Props, mapDispatch2Props)(Todo)
