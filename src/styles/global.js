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

export const PageBody = styled.div`

display: flex;
flex-direction: row;
height: calc(100vh - 145px);


`;