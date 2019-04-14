import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import Navbar from './Component/Navbar'
// import Footer from './Component/Footer'
import Todo from './Page/todo'

const Router = () => (
  <BrowserRouter>
    <React.Fragment>
      <Route path='/' component={Navbar} />
      {/* <Route path='/' component={Footer} /> */}
      <Route path='/' component={Todo} />
    </React.Fragment>
  </BrowserRouter>
)

export default Router
