import React, { useCallback } from "react";
//import CepApi from '../../helpers/CepApi';
import { Container } from './styled';
import { Select, MenuItem, TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../helpers/Api";

import getValidationError from "../../utils/getValidationError";
import { useToast } from "../../hooks/toast";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  street: "",
  number: "",
  cpfCnpj: "",
  complement: ""

}

const schema = Yup.object().shape({

  name: Yup
    .string()
    .required("Nome Obrigratorio"),
  email: Yup
    .string()
    .required("Email requerido ")
    .email("Digite um Email Válido"),
  phone: Yup
    .string()
    .required("Número para contato reuqerido"),
  cpfCnpj: Yup
    .string()
    .required("Cpf Requerido"),

});


const Page = () => {
  const { addToast } = useToast();


  const formik = useFormik({
    initialValues: initialValues,

    validationSchema: schema,


    onSubmit: useCallback(async (values) => {
      try {

        await schema.validate(values, {
          abortEarly: false
        })

        var parameter = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          cpfCnpj: values.cpfCnpj
        }
        await api.post("/user", parameter)
          .then(response => {
            console.log(response);
            addToast({
              type: 'success',
              title: "Usuario cadastrado com Sucesso"
            });
          }).catch(error =>{debugger
            console.log(error);
          })


      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const erros = getValidationError(error);
          erros.forEach(err => {
            addToast({
              type: 'error',
              title: "Erro Autenticação da Pagina",
              description: err
            });
          });
          error.erros.map((e) => {
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
          title: "Erro Autenticação da Pagina",
          description: "Erro inesperado"
        });


      };
    }, [addToast]),

    onReset: initialValues

  });

  return (
    <Container>
      <form onReset={formik.handleReset} onSubmit={formik.handleSubmit} noValidate>
        <h1>Dados Cadastrais </h1>
        <hr />
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Nome"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          fullWidth
          id="email"
          name="email"
          label="E-mail"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Telefone Celular"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <TextField
          fullWidth
          id="cpfCnpj"
          name="cpfCnpj"
          label="Cpf Cnpj"
          value={formik.values.cpfCnpj}
          onChange={formik.handleChange}
          error={formik.touched.cpfCnpj && Boolean(formik.errors.cpfCnpj)}
          helperText={formik.touched.cpfCnpj && formik.errors.cpfCnpj}
        />
        <TextField
          fullWidth
          id="number"
          name="number"
          label="Numero"
          value={formik.values.number}
          onChange={formik.handleChange}
        />
        <TextField
          fullWidth
          id="street"
          name="street"
          label="Rua"
          value={formik.values.street}
          onChange={formik.handleChange}
        />
        <TextField
          fullWidth
          id="complement"
          name="complement"
          label="Complemento"
          value={formik.values.complement}
          onChange={formik.handleChange}
        />


        <Button color="secondary" variant="contained" fullWidth type="submit">
          Cadastrar Cliente
        </Button>


      </form>
    </Container>
  );
};

export default Page;

