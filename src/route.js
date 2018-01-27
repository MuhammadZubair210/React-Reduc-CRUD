import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import Todo from './components/todo';
import Signup from './components/signup';
import Login from './components/login';

import history from './History';

class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Todo} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                </div>
            </Router>
        )
    }
}

export default Routers;