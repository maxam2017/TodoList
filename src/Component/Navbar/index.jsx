import React from 'react'
import classNames from 'classnames'
import {connect} from 'react-redux'

import style from './style.module.scss'

const mapState2Prop = ({type}) => ({
  statusNow: type
})

const mapDispatch2Prop = (dispatch) => ({
  changeStatus: (status) => dispatch({
    type: 'CHANGE_STATUS',
    status: status
  })
})

const NavItem = connect(mapState2Prop, mapDispatch2Prop)(({ord, name, statusNow, changeStatus}) => (
  <div
    className={classNames(style.navItem, statusNow === ord && 'active')}
    onClick={() => changeStatus(ord)} >
    {name}
  </div>
))

const Navbar = () => (
  <nav className={style.navbar}>
    <NavItem ord={0} name={'All'} />
    <NavItem ord={1} name={'In Progress'} />
    <NavItem ord={2} name={'Completed'} />
  </nav>
)

export default Navbar
