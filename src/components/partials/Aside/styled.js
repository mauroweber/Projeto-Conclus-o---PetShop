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

    /* display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
    margin-top: 30px; */

    > li{
      padding: 5px;
      border-bottom: 1px solid #ffff;
    }

  }


  li a{
    margin-top: 16px;
    display: block;
    color: #000;
    padding: 8px 16px;
    text-decoration: none;

    font-size: 24px;


    &:hover {
        background-color: #cf6f16;
        color: white;
    }
}


`;


