import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <h1>Welcome to dashboard</h1>
        <Link to="/logout">Logout</Link>
      </div>
    )
  }
}

export default Dashboard;