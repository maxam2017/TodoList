import React from 'react'
import classNames from 'classnames'
import {connect} from 'react-redux'
import {changeStatus} from '../../Redux/action'
import style from './style.module.scss'

const mapState2Prop = ({type}) => ({
  statusNow: type
})

const mapDispatch2Prop = (dispatch) => ({
  changeStatus: (status) => dispatch(changeStatus(status))
})

const Tab = connect(mapState2Prop, mapDispatch2Prop)(({ord, name, activeStyle, deactiveStyle, datatip, statusNow, changeStatus}) => (
  <div className={style.tab} onClick={() => changeStatus(ord)} data-tip={datatip}>
    {statusNow === ord
      ? <span className={classNames(style.icon, 'active')}>
        <i className={activeStyle} />
      </span>
      : <span className={style.icon}>
        <i className={deactiveStyle} />
      </span>
    }
    <div className={classNames(style.attr, statusNow === ord && 'active')}>{name}</div>
  </div>

))

const Tabs = () => (
  <React.Fragment>
    <div className={style.tabs}>
      <Tab ord={0} name='All' datatip='show all tasks' activeStyle='fas fa-tasks' deactiveStyle='fas fa-tasks' />
      <Tab ord={1} name='In Progress' datatip='only show tasks in progress' activeStyle='fas fa-spinner' deactiveStyle='fas fa-spinner' />
      <Tab ord={2} name='Completed' datatip='only show complete tasks' activeStyle='fas fa-check-circle' deactiveStyle='far fa-check-circle' />
    </div>
  </React.Fragment>
)

export default Tabs
