import { createGlobalStyle} from 'styled-components';
// colocar CREATE antyes da criação do stylo;
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;

  }

  body{
    -webkit-font-smoothing: antialiased;
  }

  body, input, button{

  }

  button{
    cursor: pointer;
  }
`;