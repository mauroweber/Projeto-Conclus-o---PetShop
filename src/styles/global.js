import styled, { createGlobalStyle} from 'styled-components';
// colocar CREATE antyes da criação do stylo;
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body{
    color: #FFF;
    background: #312e38;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button{
    font-size: 16px;
  }



  button{
    cursor: pointer;
  }
  #root {
      height: 100%;
      width: 100%;
  }


`;

export const Test = styled.div`

display: flex;
flex-direction: row;
height: 88vh;


`;