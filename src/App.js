import React, { Component } from 'react';
import './App.scss';
import { Route, Link } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import WorkflowDashboard from './components/pages/WorkflowDashboadPage/WorkflowDashboard';
import WorkflowPage from './components/pages/WorkflowDashboadPage/Workflow';

class App extends Component {
  state = {
    isLoggedIn: false
  };

  render() {
    return (
      <div className="main-app">
        <header className="main-header">FLOWAPP</header>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/" component={WorkflowDashboard} />
        <Route exact path="/workflows/:workflowId" component={WorkflowPage} />
      </div>
    );
  }
}

export default App;
