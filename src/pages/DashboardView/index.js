import React from 'react';
import Aside from "../../components/partials/Aside"
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,

    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Page = () => {
  const classes = useStyles();

  return (


      <Container maxWidth={"xl"} >

        <Grid
          container
          spacing={3}
          >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <h1>despesas</h1>

          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
            >
            <h1>TOTAL CUSTOMIZADO</h1>

          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <h1>TAREFAS</h1>

          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <h1>TOTAL PROFIT</h1>

          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
            >
            <h1>PROMOÇÃO</h1>

          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
            >
            <h1>Teste final

            </h1>
          </Grid>

        </Grid>
      </Container>

  );
};

export default Page;
