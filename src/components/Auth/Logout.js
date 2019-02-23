import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { logout } from '../../store/reducers/auth';

class Logout extends Component {
  static propTypes = {
    onLogout: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/login" />;
  }
} 

const mapDispatchToProps = dispatch => (
  {
    onLogout: () => dispatch(logout())
  }
)

export default connect(null, mapDispatchToProps)(Logout);