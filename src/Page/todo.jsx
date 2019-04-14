import React from 'react'
import {connect} from 'react-redux'
import ReactTooltip from 'react-tooltip'
import SwipeableViews from 'react-swipeable-views'
import { bindKeyboard } from 'react-swipeable-views-utils'
import {changeStatus, getTodo, setTodo, clearComplete} from '../Redux/action'
import TodoCard from '../Component/Todo'

import style from './style.module.scss'

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews)

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
        <ReactTooltip effect='solid' />
        <div className={style.input}>
          <input
            className={style.inputField}
            placeholder='write down your task'
            onKeyDown={(e) => this.addTodo(e)}
          />
        </div>
        <span className={style.clean} onClick={this.props.clearComplete} data-tip='get rid off completed tasks'>
          <i className='fas fa-trash-alt' />
        </span>
        <BindKeyboardSwipeableViews
          enableMouseEvents
          index={this.props.type}
          onChangeIndex={this.props.changeStatus}
          className={style.swipeContainer}
          animateHeight
          disabled={this.props.edit}
        >
          <section>
            {
              this.props.todos
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
          </section>
          <section>
            {
              this.props.todos
                .filter(
                  pair => (!pair[1].complete && this.props.type === 1)
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
          </section >
          <section>
            {
              this.props.todos
                .filter(
                  pair => (pair[1].complete && this.props.type === 2)
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
          </section>
        </BindKeyboardSwipeableViews>
      </div>
    )
  }
}

const mapState2Props = state => ({
  edit: state.edit,
  type: state.type,
  todos: Object.entries(state.todos)
})

const mapDispatch2Props = dispatch => ({
  changeStatus: (status) => dispatch(changeStatus(status)),
  getTodo: () => dispatch(getTodo()),
  setTodo: (title) => dispatch(setTodo(title)),
  clearComplete: () => dispatch(clearComplete())
})

export default connect(mapState2Props, mapDispatch2Props)(Todo)
