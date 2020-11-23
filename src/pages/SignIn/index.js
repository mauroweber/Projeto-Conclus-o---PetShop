
import React, { useCallback, useRef } from "react";
import { Box, Avatar, Checkbox, CssBaseline, FormControlLabel, Grid } from "@material-ui/core"
import { Form } from "@unform/web";
import * as Yup from 'yup';
import getValidationError from "../../utils/getValidationError";
import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";

import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useStyles, AnimationContainer } from "./styled";

import Container from '@material-ui/core/Container';
import Input from "../../components/Input/index";
import Button from "../../components/Button/index";
import { FiMail, FiLock } from "react-icons/fi";

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







const SignIn = () => {
  const classes = useStyles();
  const formRef = useRef(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const submitHandler = useCallback(async (data) => {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required("Email requerido").email("Digite E-mail valido"),
        key_password: Yup.string().min(6, "Senha contem no mínimo 6 Dígitos")
      });

      await schema.validate(data, {
        abortEarly: false
      });

      await signIn({
        email: data.email,
        key_password: data.key_password
      });

      addToast({
        type: 'success',
        title: "Usuario Autenticado"
      });

    } catch (erro) {
      if (erro instanceof Yup.ValidationError) {
        const erros = getValidationError(erro);
        formRef.current.setErrors(erros);
        erro.errors.map((e) => {
          addToast({
            type: 'error',
            title: "Erro Autenticação da Pagina",
            description: e
          });
        });
        return;
      }

      addToast({
        type: 'error',
        title: "Erro na Autenticação",
        description: "Verifique as credenciais"
      });
    };
  }, [signIn, addToast]);
  return (


    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <AnimationContainer>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
        </Typography>
          <Form ref={formRef} className={classes.form} onSubmit={submitHandler} noValidate>
            <Input
              name="email"
              icon={FiMail}
              placeholder="Email"
            />
            <Input
              name="key_password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar Senha"
            />
            <Button type="submit">Logar</Button>
            <Grid container>
              <Grid item xs>
                <Link to="/signUp" variant="body2">
                  Esqueceu a Senha?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signUp" variant="body2">
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
      </AnimationContainer>
    </Container>
  );
}
export default SignIn;