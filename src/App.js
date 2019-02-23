import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';
import Logout from './components/Auth/Logout';
import { authCheck } from './store/reducers/auth';

class App extends Component {
  static propTypes = {
    onTryAutoSignIn: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  }

  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  render() {
    // unauthenticated routes
    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
      </Switch>
    );

    // authenticated routes
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      );
    }

    return (
      <Container className="App">
        {routes}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
  onTryAutoSignIn: () => dispatch(authCheck())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
