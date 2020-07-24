import React, { Component } from 'react';
import './WorkflowDashboard.scss';
import ActionButton from '../../common/Button/Action';
import Select from '../../common/Select';
import { deepCopyObject } from '../../../utils/object';
import Workflow from './Workflow';
import { mockdata } from './mockdata';
import SearchInput from '../../common/SearchInput';

class WorkflowDashboard extends Component {
  state = {
    workflowsList: mockdata,
    filteredList: []
  };

  componentDidMount = () => {
    const filteredList = deepCopyObject(this.state.workflowsList);
    this.setState({ filteredList });
  };

  onSelectOption = event => {
    const selectedOption = event.target.value;
    this.filterWorkflows(selectedOption);
  };

  filterWorkflows = selectedOption => {
    if (selectedOption === 'all') {
      this.setState({ filteredList: this.state.workflowsList });
    } else {
      const filteredList = this.state.workflowsList.filter(
        workflow =>
          workflow.workflowStatus.toLowerCase() === selectedOption.toLowerCase()
      );
      this.setState({ filteredList });
    }
  };

  searchWorkflows = searchInput => {
    const filteredList = this.state.workflowsList.filter(workflow =>
      workflow.workflowName.toLowerCase().includes(searchInput.toLowerCase())
    );
    this.setState({ filteredList });
  };

  deleteWorkflow = (event, id) => {
    event.stopPropagation();

    const filteredList = this.state.filteredList.filter(
      workflow => workflow.workflowId !== id
    );
    const workflowsList = this.state.workflowsList.filter(
      workflow => workflow.workflowId !== id
    );

    this.setState({ filteredList, workflowsList });
  };

  changeWorkflowStatus = (event, id) => {
    event.stopPropagation();
    let flag = false;
    const workflowsList = this.state.workflowsList.map(workflow => {
      if (workflow.workflowId === id) {
        const isAnyNodePending = workflow.nodesList.find(
          node =>
            node.nodeStatus === 'Pending' || node.nodeStatus == 'InProgress'
        );
        if (isAnyNodePending) {
          console.log('Cannot be marked as completed');
        } else {
          flag = true;
          return {
            ...workflow,
            workflowStatus:
              workflow.workflowStatus === 'Pending' ? 'Completed' : 'Pending'
          };
        }
      }
      return { ...workflow };
    });

    this.setState({ workflowsList, filteredList: workflowsList });
  };

  render() {
    return (
      <div className="workflow-dashboard-page">
        <div className="workflow-header">
          <SearchInput searchWorkflows={this.searchWorkflows} />

          <Select onSelectOption={this.onSelectOption} />

          <ActionButton type="create" buttonText="Create Workflow" />
        </div>
        <div className="workflows-list-container">
          {this.state.filteredList?.map(workflow => {
            const { workflowId, workflowName, workflowStatus } = workflow;
            return (
              <Workflow
                id={workflowId}
                name={workflowName}
                status={workflowStatus}
                deleteWorkflow={this.deleteWorkflow}
                changeWorkflowStatus={this.changeWorkflowStatus}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default WorkflowDashboard;
