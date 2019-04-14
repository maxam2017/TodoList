import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import Tabs from './Component/Tabs'
import Todo from './Page/todo'

const Router = () => (
  <BrowserRouter>
    <React.Fragment>
      <Route path='/' component={Todo} />
      <Route path='/' component={Tabs} />
    </React.Fragment>
  </BrowserRouter>
)

export default Router
