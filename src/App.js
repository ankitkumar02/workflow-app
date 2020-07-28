import React from 'react';
import './App.scss';
import { Route, useHistory } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage/LoginPage';
import WorkflowDashboard from './components/pages/WorkflowDashboadPage/WorkflowDashboard';
import WorkflowPage from './components/pages/WorkflowPage/WorkflowPage';
import ActionButton from './components/common/Button/Action';

const App = props => {
  const history = useHistory();

  return (
    <div className="main-app">
      <header className="main-header">
        FLOWAPP
        <ActionButton
          buttonText="Logout"
          type="primary"
          onClick={() => history.push('/')}
        />
      </header>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/workflows" component={WorkflowDashboard} />
      <Route exact path="/workflows/:workflowId" component={WorkflowPage} />
    </div>
  );
};

export default App;
