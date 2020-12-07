import React, { useCallback, useEffect, useState } from "react";
//import CepApi from '../../helpers/CepApi';
// import { Container } from './styled';
import { Select, MenuItem, TextField, Button } from "@material-ui/core";
import { Form, Container, Row, Col, ListGroup } from "react-bootstrap";
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
  complement: "",
};

const schema = Yup.object().shape({
  name: Yup.string().required("Nome Obrigratorio"),
  email: Yup.string()
    .required("Email requerido ")
    .email("Digite um Email Válido"),
  phone: Yup.string().required("Número para contato reuqerido"),
  cpfCnpj: Yup.string().required("Cpf Requerido"),
});

const Page = () => {
  const [clients, setClients] = useState([]);
  const { addToast } = useToast();

  async function loadClients() {
    const response = await api.get("/user/findAll");

    setClients(response.data);
    console.log(response.data);
  }
  useEffect(() => {
    loadClients();
  }, []);

  const formik = useFormik({
    initialValues: initialValues,

    validationSchema: schema,

    onSubmit: useCallback(
      async (values) => {
        try {
          await schema.validate(values, {
            abortEarly: false,
          });

          var parameter = {
            name: values.name,
            email: values.email,
            phone: values.phone,
            cpfCnpj: values.cpfCnpj,
          };
          await api
            .post("/user", parameter)
            .then((response) => {
              addToast({
                type: "success",
                title: "Usuario cadastrado com Sucesso",
              });
            })
            .catch((error) => {
              debugger;
              console.log(error);
            });
        } catch (error) {
          if (error instanceof Yup.ValidationError) {
            const erros = getValidationError(error);
            erros.forEach((err) => {
              addToast({
                type: "error",
                title: "Erro Autenticação da Pagina",
                description: err,
              });
            });
            error.erros.map((e) => {
              addToast({
                type: "error",
                title: "Erro Autenticação da Pagina",
                description: e,
              });
            });
            return;
          }

          addToast({
            type: "error",
            title: "Erro Autenticação da Pagina",
            description: "Erro inesperado",
          });
        }
      },
      [addToast]
    ),

    onReset: initialValues,
  });

  return (
    <Container>
      <form
        onReset={formik.handleReset}
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <h1>Dados Cadastrais </h1>
        <hr />
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Nome:</Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                placeholder="Nome completo"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>E-mail:</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Seu melhor e-mail"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>Telefone:</Form.Label>
              <Form.Control
                type="text"
                id="phone"
                name="phone"
                placeholder="Telefone ou celular"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Col>
          </Row>
        </Form.Group>

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
      <Row>
        <Col md={12}>
          {clients.map((client) => (
            <ListGroup horizontal key={client.id}>
              <ListGroup.Item>
                <strong>NOME: </strong> {client.name}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>E-MAIL: </strong>
                {client.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>TELEFONE: </strong> {client.phone}
              </ListGroup.Item>
              <ListGroup.Item>and above!</ListGroup.Item>
            </ListGroup>
          ))}
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Page;
