import React from 'react';
import './Button.scss';

const Button = props => {
  return (
    <button
      className={`button-container ${props.type}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.buttonText}
    </button>
  );
};

export default Button;
