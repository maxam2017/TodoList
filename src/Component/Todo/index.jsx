import React from 'react'
import classNames from 'classnames'
import {connect} from 'react-redux'
import {handleTodo, editTodo} from '../../Redux/action'
import style from './style.module.scss'

class Todo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mode: 0
    }
    this.edit = this.edit.bind(this)
    this.endEdit = this.endEdit.bind(this)
    this.complete = this.complete.bind(this)
  }
  edit () {
    this.setState({mode: 1})
  }
  endEdit (e) {
    let keyCode = e.keyCode
    let value = e.target.value
    if (keyCode === 13) {
      this.props.editTodo(this.props.todoid, value)
      this.setState({mode: 0})
    }
  }
  complete (e) {
    this.props.handleTodo(this.props.todoid)
    e.stopPropagation()
  }
  render () {
    let {completed, title} = this.props
    let d = new Date()
    return (
      <div className={style.card} onClick={this.edit}>
        <div className={style.left}>
          {completed
            ? <i className={classNames('fas fa-check-square', style.checkbox2)} onClick={(e) => this.complete(e)} />
            : <div className={style.checkbox} onClick={(e) => this.complete(e)} />}
        </div>
        {
          this.state.mode === 0
            ? <div className={classNames(style.title, completed && 'completed')}>{title}</div>
            : <input defaultValue={title} onKeyDown={(e) => this.endEdit(e)} />
        }
        <div className={style.calendar}>
          <i className='fa fa-calendar' />
          {`${(d.getUTCMonth() + 1)}/${d.getUTCDate()}`}
        </div>
      </div>
    )
  }
}

const mapDispatch2Props = dispatch => ({
  handleTodo: (id) => dispatch(handleTodo(id)),
  editTodo: (id, title) => dispatch(editTodo(id, title))
})

export default connect(null, mapDispatch2Props)(Todo)
