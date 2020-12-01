import styled from "styled-components";



export const Container = styled.div`
    height: 100%;
  form {
    position: absolute;
    border-radius: 5px;
    padding-top: 20px;
    padding-bottom: 20px;
    box-shadow: 0px 0px 3px #999;
    margin: 5% 50% 0 0;
    margin-left : 25%;
    padding: 130px;

    .area {
      display: flex;
      align-items: center;
      padding: 10px;
      max-width: 500px;

      .area--title {
        width: 200px;
        text-align: right;
        padding-right: 20px;
        font-weight: bold;
        font-size: 14px;
        text-transform: uppercase;
      }

      .area--input {
        flex: 1;

        input {
          width: 100%;
          font-size: 14px;
          padding: 5px;
          border: 1px solid #ddd;
          border-radius: 3px;
          outline: 0;
          transition: all ease 0.4s;

          &:focus {
            border: 1px solid #333;
            color: #333;
          }
        }

        button {
          background-color: #e67e22;
          border: 0;
          outline: 0;
          padding: 5px 10px;
          border-radius: 4px;
          color: #fff;
          cursor: pointer;
          text-transform: uppercase;

          &:hover {
            background-color: #d35400;
          }
        }
      }
    }
  }
`;
