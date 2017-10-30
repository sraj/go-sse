import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Dashboard from 'page/dashboard';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Dashboard}/>
        </Switch>
    </Router>
);

ReactDOM.render(Routes(), document.getElementById('root'));