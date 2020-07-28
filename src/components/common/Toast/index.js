import React from 'react';
import './Toast.scss';

const Toast = ({ type, children, onCloseToast }) => {
  return (
    <div className={`toast-container ${type}`}>
      {children}
      <span className="close-button" onClick={() => onCloseToast()}>
        X
      </span>
    </div>
  );
};

export default Toast;
