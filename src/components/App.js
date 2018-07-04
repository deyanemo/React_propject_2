import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions';
import Dashboard from './Dashboard';
import Leaderboard from './leaderboard';
import Login from './login';
import Nav from './navigation';
import NewQuestion from './newQuestion';
import NotFound from './notfound';
import ProtectedRoute from '../utils/ProtectedRoute';
import Deyanemo from './Deyanemo'
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { loggedIn } = this.props;

    return (
      <Router>
        <Fragment>
          <div className='container'>
            <Nav />
              <div>
                <Switch>
                  <ProtectedRoute path='/' exact component={Dashboard} loggedIn={loggedIn} />
                  <ProtectedRoute path='/leaderboard' exact component={Leaderboard} loggedIn={loggedIn} />
                  <ProtectedRoute path='/add' exact component={NewQuestion} loggedIn={loggedIn} />
                  <Route path='/login' exact component={Login} />
                  <ProtectedRoute path='/questions/:id' exact component={Deyanemo} loggedIn={loggedIn} />
                  
                  <Route component={NotFound} />
                </Switch>
              </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loggedIn: authedUser !== null,
  };
}

export default connect(mapStateToProps)(App);

