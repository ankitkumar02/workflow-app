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
  status,
  name,
  deleteWorkflow,
  changeWorkflowStatus
}) => {
  return (
    <div className="workflow-container" key={id}>
      <Icon
        name="remove"
        size={50}
        iconClass="remove-button"
        handleIconClick={event => deleteWorkflow(event, id)}
      />
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
            changeWorkflowStatus(event, id);
          }}
        />
      </div>
    </div>
  );
};

export default Workflow;
