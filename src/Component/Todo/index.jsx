import React from 'react'
import classNames from 'classnames'
import {connect} from 'react-redux'
import {handleTodo, editTodo, removeById} from '../../Redux/action'
import style from './style.module.scss'

class Todo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mode: false
    }
    this.edit = this.edit.bind(this)
    this.endEdit = this.endEdit.bind(this)
    this.complete = this.complete.bind(this)

    this.inputRef = React.createRef()
  }

  edit () {
    if (this.state.mode === false) {
      this.props.toggleTouchEvent()
    } else {
      this.props.editTodo(this.props.todoid, this.inputRef.current.value)
    }
    this.setState({mode: !this.state.mode})
  }
  endEdit (e) {
    let keyCode = e.keyCode
    let value = e.target.value
    if (keyCode === 13) {
      this.props.editTodo(this.props.todoid, value)
      this.setState({mode: false})
    } else if (keyCode === 27) {
      this.setState({mode: false})
    }
    this.props.toggleTouchEvent()
  }
  complete (e) {
    this.setState({mode: false})
    this.props.handleTodo(this.props.todoid)
    e.stopPropagation()
  }
  remove (e) {
    this.props.removeById(this.props.todoid)
    e.stopPropagation()
  }
  render () {
    let {completed, title} = this.props
    let d = new Date(parseInt(this.props.todoid, 16))
    return (
      <div className={style.card} onClick={this.edit}>
        <span className={style.remove} onClick={(e) => this.remove(e)}><i className='fas fa-times' /></span>
        <div className={style.left}>
          {completed
            ? <i className={classNames('fas fa-check-square', style.checkbox2)} onClick={(e) => this.complete(e)} />
            : <div className={style.checkbox} onClick={(e) => this.complete(e)} />}
        </div>
        {
          this.state.mode === false
            ? <div className={classNames(style.title, completed && 'completed')}>{title}</div>
            : <input ref={this.inputRef} defaultValue={title} onKeyDown={(e) => this.endEdit(e)} onClick={(e) => e.stopPropagation()} />
        }
        <div className={style.calendar}>
          <i className='fa fa-calendar' />
          {`${(d.getMonth() + 1)}/${d.getDate()} ${d.getHours().toString().padStart(2, 0)}:${d.getMinutes().toString().padStart(2, 0)}`}
        </div>
      </div>
    )
  }
}

const mapDispatch2Props = dispatch => ({
  handleTodo: (id) => dispatch(handleTodo(id)),
  editTodo: (id, title) => dispatch(editTodo(id, title)),
  toggleTouchEvent: () => dispatch({type: 'TOGGLE_TOUCH_EVENT'}),
  removeById: (id) => dispatch(removeById(id))
})

export default connect(null, mapDispatch2Props)(Todo)
