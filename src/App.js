import React from 'react';
import './App.css';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import * as ROUTES from './constants/routes'

import Login from './views/Login'
import Home from './views/Home'

function App() {
  return (
    <div className="h-100 overflow-x-hidden">
      <Router>
        <Switch>
          <Route exact path={ROUTES.LOGIN} component={Login}/>
          <Route path={ROUTES.HOME} component={Home}/>
          <Redirect from="/" to ={ROUTES.LOGIN}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
