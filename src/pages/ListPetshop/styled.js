import styled from "styled-components";

export const PageArea = styled.div`
  height: 60px;

  //CSS do cabeçalho

  .header-home-container {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .promo-container {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      font-size: 17px;
      font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      text-transform: uppercase;
      text-decoration: none;
      color: Black;

      :hover {
        color: #333;
      }
    }
    img {
      width: 30px;
      height: 30px;
    }

    :hover {
      cursor: pointer;
    }
  }
  .searchItems {
    font-size: 17px;
    color: #999;
    padding-left: 53px;
    background-color: #f7f7f7;
    border: 1px solid #f2f2f2;
    outline: none;
    border-radius: 5px;
    width: 500px;
    height: 50px;
  }

  //CSS do objeto Petshop

  .body-petshop {
    display: flex;
    flex-wrap: wrap;

    .body-home-container {
      display: flex;
      margin-top: 25px;
      border-radius: 5px;
      width: 49%;
      height: 150px;
      background-color: #f7f7f7;
      border: 1px solid #f2f2f2;
      margin-right: 10px;

      :hover {
        cursor: pointer;
      }

      .petshop-container {
        width: 100%;
        display: flex;
        padding: 10px;

        .logoPet {
          display: flex;
          width: 40%;
          height: 130px;
          justify-content: center;
          align-items: center;
          img {
            width: 100px;
          }
        }
        .dataPet {
          flex-direction: column;
          width: 100%;
          display: flex;
          align-items: center;
          a {
            font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
              "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
            font-size: 16px;
            font-weight: bold;
            text-decoration: none;
            color: #666;
          }
          .classification {
            display: flex;
            align-items: center;
          }
          img {
            height: 20px;
          }
        }
      }
    }
  }
`;
