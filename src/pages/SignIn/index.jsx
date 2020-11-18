import React, { useState } from "react";
import Api from "../../helpers/Api";
import { Box, Avatar, Checkbox, CssBaseline, FormControlLabel, Grid} from "@material-ui/core"
import {Form} from "@unform/web"

import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Input from "../../components/Input/index"
import Button from "../../components/Button/index"
import { FiLogIn, FiMail, FiLock } from "react-icons/fi"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://material-ui.com/">
        Pet Care
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const useStyles = makeStyles((theme) => ({
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



const SignIn = () => {
  const classes = useStyles();

  const submitHandler = (data) => {
    console.log(data);
    Api.post("/auth", { email: data.email, key_password: data.key_password })
      .then((response) => {
        const { token, user } = response.data;
        localStorage.setItem('@PetsCare:token', token);
      }).catch(error => {
        console.error(error);
      });

  }
  return (


    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Form className={classes.form} onSubmit={submitHandler} noValidate>
          <Input
            name="email"
            icon={FiMail}
            placeholder = "Email"
          />
          <Input
            name="key_password"
            icon={FiLock}
            type="password"
            placeholder = "Senha"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar Senha"
          />
          <Button type="submit">Logar</Button>
          <Grid container>
            <Grid item xs>
              <Link to="/" variant="body2">
                Esqueceu a Senha?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/" variant="body2">
                {"Você não tem uma conta? Cadastrar-se"}
              </Link>
            </Grid>
          </Grid>
        </Form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <br />
    </Container>
  );
}
export default SignIn;