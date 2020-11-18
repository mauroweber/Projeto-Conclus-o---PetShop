import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';
import PropTypes from 'prop-types';



export default function Button({
  children,
  type,
  ...rest
}) {
  return (
    <Container{...rest} type="submit">
        {children}
    </Container>

  )

};

Button.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string
}
