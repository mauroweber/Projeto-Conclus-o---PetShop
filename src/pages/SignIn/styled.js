import styled, {keyframes} from "styled-components";
import { makeStyles } from '@material-ui/core/styles';

export const PageArea = styled.div`
  form {
    border-radius: 3px;
    padding-top: 20px;
    padding-bottom: 20px;
    box-shadow: 0px 0px 3px #999;

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

    }
  }
`;
const appearFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translateY(-500px);
  }

  to{
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimationContainer = styled.div`
  animation: ${appearFromLeft} 2s;
`;

export const useStyles = makeStyles((theme) => ({
  

  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
