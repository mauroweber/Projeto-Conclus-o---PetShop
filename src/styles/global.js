import styled, { createGlobalStyle } from "styled-components";
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
    text-rendering: optimizeLegibility;
  }

  body, input, button{
    font-size: 16px;
  }

 html, body, #root{
   height:100%;
   width: 100%;
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
