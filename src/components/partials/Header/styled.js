import styled from "styled-components";

export const HeaderArea = styled.div`
  height: 80px;
  background-color: #e67e22;
  border-bottom: 1px solid #ccc;

`;

export const Container = styled.div`
  max-width: 1000px;
  margin: auto;
  display: flex;
  flex:1;


  align-items: stretch;

  img {
    width: 80px;
    height: 80px;
    margin-left: 20px;
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
      text-transform: uppercase;

      a,
      button {
        border: 0;
        background: none;
        color: #fff;
        cursor: pointer;
        outline: 0;

        &:hover {
          color: #2c3e50;
        }
      }
    }
  }
`;