import styled from "styled-components";

export const AsideArea = styled.div`
  width: 220px;
  height: 600px;
  background-color: #e67e22;
  height: 100%;

  display: 1;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 200px;

  }

  li a{

    display: block;
    color: #000;
    padding: 8px 16px;
    text-decoration: none;

    &:hover {
        background-color: #555;
        color: white;
    }
}


`;


