import React from 'react';

const Node = ({ title, description }) => {
  return (
    <div className="workflow-node">
      <input className="workflow-node-title" type="text" value={title} />
      <textarea className="workflow-node-description">{description}</textarea>
    </div>
  );
};

export default Node;
