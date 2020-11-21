  
import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';


const Tooltip= ({ title, className, children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;

Tooltip.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string
}