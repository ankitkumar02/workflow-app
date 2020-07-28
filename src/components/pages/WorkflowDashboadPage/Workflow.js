import React from 'react';
import Icon from '../../common/Icon';
import StatusButton from '../../common/Button/Status';
import './Workflow.scss';

export const workflowStatusColors = {
  completed: 'green',
  pending: 'grey',
  inprogress: 'blue'
};

const Workflow = ({
  id,
  index,
  status,
  name,
  nodesList,
  deleteWorkflow,
  changeWorkflowStatus,
  openWorkflowPage
}) => {
  return (
    <div className="workflow-container" key={id}>
      <Icon
        name="remove"
        size={50}
        iconClass="remove-button"
        handleIconClick={event => deleteWorkflow(event, id)}
      />
      <div
        className="workflow-main-content"
        onClick={() => openWorkflowPage(`/workflows/${id}`, nodesList)}
      >
        <div className="workflow-title">
          <span>{name}</span>
        </div>
        <div className="workflow-status-container">
          <span className={`${status.toLowerCase()}`}>
            {status.toUpperCase()}
          </span>
          <StatusButton
            fillColor={workflowStatusColors[status.toLowerCase()]}
            onIconClick={event => {
              changeWorkflowStatus(event, id, index);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Workflow;
