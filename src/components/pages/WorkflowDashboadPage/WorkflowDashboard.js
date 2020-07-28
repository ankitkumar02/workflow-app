import React, { Component } from 'react';
import './WorkflowDashboard.scss';
import ActionButton from '../../common/Button/Action';
import Select from '../../common/Select';
import Workflow from './Workflow';
import SearchInput from '../../common/SearchInput';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Toast from '../../common/Toast';
import {
  fetchWorkflowsList,
  updateWorkflowsList
} from '../../../actions/workflow-actions';

class WorkflowDashboard extends Component {
  state = {
    searchValue: '',
    filterValue: 'all',
    isToastShown: false,
    toastType: '',
    toastContent: ''
  };

  componentDidMount = () => {
    // this.props.fetchWorkflowsList();
  };

  onFilterValueChange = event => {
    this.setState({ filterValue: event.target.value });
  };

  onSearchValueChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  filterWorkflows = (selectedOption, workflowsList) => {
    let filteredList = [...workflowsList];
    if (selectedOption === 'all') {
      return filteredList;
    } else {
      return filteredList.filter(
        workflow =>
          workflow.workflowStatus.toLowerCase() === selectedOption.toLowerCase()
      );
    }
  };

  searchWorkflows = searchInput => {
    const filteredList = this.props.workflowsList.filter(workflow =>
      workflow.workflowName.toLowerCase().includes(searchInput.toLowerCase())
    );
    return filteredList;
  };

  deleteWorkflow = (event, id) => {
    event.stopPropagation();

    const workflowsList = this.props.workflowsList.filter(
      workflow => workflow.workflowId !== id
    );
    this.props.updateWorkflowsList(workflowsList);
  };

  changeWorkflowStatus = (event, id, index) => {
    event.stopPropagation();

    const isAnyNodePending = this.props.workflowsList[index].nodesList.find(
      node => node.nodeStatus === 'Pending' || node.nodeStatus == 'InProgress'
    );
    if (isAnyNodePending) {
      this.showToastMessage(
        'error',
        'Cannot change the workflow status as one or more nodes are still pending'
      );
    } else {
      const workflowsList = this.props.workflowsList.map(workflow => {
        if (workflow.workflowId === id) {
          return {
            ...workflow,
            workflowStatus:
              workflow.workflowStatus === 'Pending' ? 'Completed' : 'Pending'
          };
        }
        return { ...workflow };
      });
      this.props.updateWorkflowsList(workflowsList);
      this.showToastMessage('success', 'Workflow status changed');
    }
  };

  openWorkflowPage = (url, nodesList) => {
    this.props.history.push({
      pathname: url
    });
  };

  renderCreateWorkflow = () => {
    const newWorkflowId =
      this.props.workflowsList[this.props.workflowsList.length - 1].workflowId +
      1;
    this.props.history.push(`/workflows/${newWorkflowId}`);
  };

  closeToastMessage = () => {
    this.setState({ isToastShown: false });
  };

  showToastMessage = (toastType, toastContent) => {
    this.setState({
      isToastShown: true,
      toastType,
      toastContent
    });
  };

  render() {
    const {
      searchValue,
      filterValue,
      isToastShown,
      toastType,
      toastContent
    } = this.state;
    const workflowsList = this.searchWorkflows(searchValue);
    const filteredList = this.filterWorkflows(filterValue, workflowsList);

    return (
      <div className="workflow-dashboard-page">
        <div className="workflow-header">
          <SearchInput
            value={this.state.searchValue}
            onSearchValueChange={this.onSearchValueChange}
          />

          <Select
            value={this.state.filterValue}
            onFilterValueChange={this.onFilterValueChange}
          />

          <ActionButton
            type="create"
            buttonText="Create Workflow"
            onClick={() => this.renderCreateWorkflow()}
          />
        </div>
        <div className="workflows-list-container">
          {filteredList?.map((workflow, index) => {
            const {
              workflowId,
              workflowName,
              workflowStatus,
              nodesList
            } = workflow;
            return (
              <Workflow
                id={workflowId}
                index={index}
                name={workflowName}
                status={workflowStatus}
                nodesList={nodesList}
                deleteWorkflow={this.deleteWorkflow}
                changeWorkflowStatus={this.changeWorkflowStatus}
                openWorkflowPage={this.openWorkflowPage}
              />
            );
          })}
        </div>
        {isToastShown && (
          <Toast type={toastType} onCloseToast={this.closeToastMessage}>
            {toastContent}
          </Toast>
        )}
      </div>
    );
  }
}

const mapStateToProps = store => {
  console.log(store);
  return {
    workflowsList: store.workflows.workflowsList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWorkflowsList: () => dispatch(fetchWorkflowsList()),
    updateWorkflowsList: workflowsList =>
      dispatch(updateWorkflowsList(workflowsList))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(WorkflowDashboard));
