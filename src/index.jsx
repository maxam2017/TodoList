import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import Router from './Router'
import reducer from './Redux/reducer'
import './reset.scss'

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>
  , document.getElementById('root')
)
