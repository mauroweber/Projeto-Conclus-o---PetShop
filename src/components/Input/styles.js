import styled from 'styled-components'

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
  
  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;
    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }

`