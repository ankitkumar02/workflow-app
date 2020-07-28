import React, { Component } from 'react';
import ActionButton from '../../common/Button/Action';
import Node from './Node';
import { connect } from 'react-redux';
import './WorkflowPage.scss';
import { updateWorkflowsList } from '../../../actions/workflow-actions';

class WorkflowPage extends Component {
  state = {
    workflowName: '',
    nodesList: []
  };

  componentDidMount = () => {
    const workflowDetails = this.retrieveNodesList(
      this.props.match.params.workflowId,
      this.props.workflowsList
    );
    if (workflowDetails.length > 0) {
      this.setState({
        workflowName: workflowDetails[0].workflowName,
        nodesList: workflowDetails[0].nodesList
      });
    } else {
      this.setState({
        workflowName: 'NEW WORKFLOW NAME',
        nodesList: []
      });
    }
  };

  retrieveNodesList = (nodeId, workflowsList) => {
    const workflowDetails = workflowsList.filter(
      workflow => workflow.workflowId === Number(nodeId)
    );
    return workflowDetails ? workflowDetails : [];
  };

  handleWorkflowName = event => {
    this.setState({ workflowName: event.target.value });
  };

  shuffleNodes = () => {};

  addNode = () => {
    const nodesList = [...this.state.nodesList];
  };

  deleteNode = () => {};

  saveWorkflow = () => {
    const workflowId = this.props.match.params.workflowId;
    const { workflowName, nodesList } = this.state;
    const workflowsList = this.props.workflowsList;
    let updatedWorkflowsList;

    const isExistingWorkflow = workflowsList.find(
      workflow => workflow.workflowId === Number(workflowId)
    );

    if (isExistingWorkflow) {
      updatedWorkflowsList = workflowsList.map(workflow => {
        if (workflow.workflowId === Number(workflowId)) {
          return {
            ...workflow,
            workflowName,
            nodesList: [...nodesList]
          };
        } else {
          return { ...workflow };
        }
      });
    } else {
      updatedWorkflowsList = [...workflowsList];
      updatedWorkflowsList.push({
        workflowId,
        workflowName: this.state.workflowName,
        workflowStatus: 'Pending',
        nodesList: this.state.nodesList
      });
    }

    this.props.updateWorkflowsList(updatedWorkflowsList);
  };

  render() {
    const { workflowName, nodesList } = this.state;

    return (
      <div className="workflow-page">
        <div className="workflow-page-header">
          <div>
            <input
              type="text"
              className="workflow-name"
              value={workflowName}
              onChange={this.handleWorkflowName}
            />
          </div>
          <div className="workflow-actions">
            <ActionButton
              type="shuffle"
              buttonText="Shuffle"
              onClick={() => this.shuffleNodes()}
            />
            <ActionButton
              type="delete"
              buttonText="Delete"
              onClick={() => this.deleteNode()}
            />
            <ActionButton
              type="create"
              buttonText="Add Node"
              onClick={() => this.addNode()}
            />
            <ActionButton
              type="primary"
              buttonText="Save"
              onClick={() => this.saveWorkflow()}
            />
          </div>
        </div>
        <div className="workflow-nodes-container">
          {nodesList?.map(node => (
            <Node title={node.nodeName} description={node.nodeDescription} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  workflowsList: store.workflows.workflowsList
});

const mapDispatchToProps = dispatch => ({
  updateWorkflowsList: workflowsList =>
    dispatch(updateWorkflowsList(workflowsList))
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowPage);
