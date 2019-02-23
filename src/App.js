import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <Container className="App">
        <Switch>
          <Route path="/login" component={Login} />
        </Switch>
      </Container>
    );
  }
}

export default App;
