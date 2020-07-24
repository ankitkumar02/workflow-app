import React from 'react';
import PropTypes from 'prop-types';
import remove from '../../../assets/icons/remove.png';
import './Icon.scss';

const iconMapping = {
  remove
};

const Icon = ({
  name,
  size,
  iconClass = '',
  handleIconClick = () => {},
  handleMouseEnterClick = () => {},
  handleMouseLeaveClick = () => {},
  title = ''
}) => (
  <img
    src={iconMapping[name]}
    width={size}
    height={size}
    className={`icon-class ${iconClass}`}
    onClick={handleIconClick}
    onMouseEnter={handleMouseEnterClick}
    onMouseLeave={handleMouseLeaveClick}
    title={title}
  />
);

Icon.propTypes = {
  name: PropTypes.string.isRequired
};

export default Icon;
