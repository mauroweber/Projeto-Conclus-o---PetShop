import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Typography, Form, Modal, Col, Button, Row } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import { Container } from "./styled";
import Api from "../../helpers/Api";
import * as yup from "yup";
import { useFormik } from "formik";
import getValidationError from "../../utils/getValidationError";
import { useToast } from "../../hooks/toast";
import Swal from 'sweetalert2';

const schema = yup.object().shape({
  name: yup.string().required("Insira o nome do Pet"),
  email: yup.string().required("E-Mail Obrigatorio").email("Digite email valido"),
  password: yup.string().required("Digite a senha ").min(6, "A senha deve conter minimo 6 caracteres"),
  passwordCheck: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  passwordCheck: "",
};

const Pets = () => {
  const { addToast } = useToast();
  const history = useHistory();

  const formik = useFormik({
    initialValues: initialValues,

    validationSchema: schema,

    onSubmit: useCallback(async (data) => {

      try {
        await schema.validate(data, {
          abortEarly: false
        })

        let parameter = {
          name: data.name,
          key_password: data.password,
          email: data.email,
        }

        await Api.post("/user/register", parameter)
          .then(response => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Cadastrado com Sucesso',              
              showConfirmButton: false,
              timer: 1500
            })
            setTimeout(() => {
              history.push("/signin");              
            }, 1500);
          });

      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const erros = getValidationError(error);
          erros.forEach(err => {
            addToast({
              type: 'error',
              title: "Erro Autenticação da Pagina",
              description: err
            });
          });
          return;
        }
      };

    }, [])

  });





  return (
    <Container >
      <Form onReset={formik.resetForm} onSubmit={formik.handleSubmit} noValidate >
        <h2>Cadastro Usuario </h2>
        <hr/>
        <Form.Row md={1}>
          <Form.Group as={Col} controlId="name" >
            <TextField
              fullWidth
              id="name"
              inputProps={{ maxLenght: 10 }}
              name="name"
              label="Nome"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="email">
            <TextField
              fullWidth
              id="email"
              name="email"
              label="E-mail"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="password">
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Senha "
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="passwordCheck">
            <TextField
              fullWidth
              id="passwordCheck"
              name="passwordCheck"
              type="password"
              label="Confirme a Senha"
              value={formik.values.passwordCheck}
              onChange={formik.handleChange}
              error={formik.touched.passwordCheck && Boolean(formik.errors.passwordCheck)}
              helperText={formik.touched.passwordCheck && formik.errors.passwordCheck}
            />
          </Form.Group>
        </Form.Row>
        <Button type="submit">Cadastrar     </Button>
      </Form>
    </Container >
  );


}

export default Pets;