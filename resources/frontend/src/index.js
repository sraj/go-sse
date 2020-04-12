import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './sass/frontend.scss';

import Dashboard from './js/page/dashboard';
import About from './js/page/about';
import Info from './js/page/info';



const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/about" component={About} />
      <Route exact path="/info" component={Info} />
    </Switch>
  </Router>
);

ReactDOM.render(Routes(), document.getElementById('root'));
