import styled from "styled-components";

export const PageArea = styled.div`
  .Container {
    display: flex;
    width: 1000px;

    .personalArea {
      flex-wrap: wrap;
    }
  }

  .area {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
  }
  .btnAdd {
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      display: flex;
      align-items: center;
      font-size: 17px;
      cursor: pointer;
      background-color: #ff8c00;
      border: 0;
      outline: 0;
      border-radius: 6px;
      padding: 15px 25px;
      margin-top: 25px;
      margin-bottom: 25px;

      &:hover {
        background-color: #ff4500;
      }
    }
  }
`;
