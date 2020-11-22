import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip'

export const Container = styled.div`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  
  border: 2px solid #232129;
  color: #666360;
  display: flex;
  align-items: center;
  transition: all 0.2s ease-in-out;

  & + div {
    margin-top: 8px;
  }
  
  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}


  ${props => props.isFocused && css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  
  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #ffffff;
    &::placeholder {
      color: #8a8785;
    }
  }

  svg {
    margin-right: 16px;
  }

`

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;