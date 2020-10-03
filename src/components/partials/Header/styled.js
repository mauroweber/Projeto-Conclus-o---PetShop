import styled from "styled-components";

export const HeaderArea = styled.div`
  height: 60px;
  background-color: #e67e22;
  border-bottom: 1px solid #ccc;

  .container {
    max-width: 1000px;
    margin: auto;
    display: flex;
  }

  .logo {
    flex: 1;
    display: flex;
    align-items: center;
    height: 60px;
  }
  a {
    text-decoration: none;
  }

  nav {
    padding-top: 10px;
    padding-bottom: 10px;

    ul,
    li {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    ul {
      display: flex;
      align-items: center;
      height: 40px;
    }

    li {
      margin-left: 20px;
      margin-rigth: 20px;
      text-transform: uppercase;

      a,
      button {
        border: 0;
        background: none;
        color: #fff;
        font-heigth: blod;
        cursor: pointer;
        outline: 0;

        &:hover {
          color: #2c3e50;
        }
      }
    }
  }
`;
