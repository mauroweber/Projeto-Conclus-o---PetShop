import React, { useCallback, useEffect, useState } from "react";
import CepApi from "../../helpers/CepApi";
import InputMask from "react-input-mask";
// import { Container } from './styled';

import {
  Form,
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
} from "react-bootstrap";
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
    <Container style={{ marginTop: 20 }}>
      <Col md={12}>
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

          <Form.Group>
            <Row>
              <Col md={4}>
                <Form.Label>CPF/CNPJ</Form.Label>
                <Form.Control
                  id="cpfCnpj"
                  name="cpfCnpj"
                  label="Cpf Cnpj"
                  value={formik.values.cpfCnpj}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.cpfCnpj && Boolean(formik.errors.cpfCnpj)
                  }
                  helperText={formik.touched.cpfCnpj && formik.errors.cpfCnpj}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row>
              <Col md={4}>
                <Form.Label>CEP:</Form.Label>
                <Form.Control
                  id="cep"
                  name="cep"
                  label="CEP"
                  value={formik.values.cep}
                  onChange={formik.handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Rua:</Form.Label>
                <Form.Control
                  id="street"
                  name="street"
                  label="Rua"
                  value={formik.values.street}
                  onChange={formik.handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Número:</Form.Label>
                <Form.Control
                  id="complement"
                  name="complement"
                  label="Complemento"
                  value={formik.values.complement}
                  onChange={formik.handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Bairro:</Form.Label>
                <Form.Control
                  id="complement"
                  name="complement"
                  label="Complemento"
                  value={formik.values.complement}
                  onChange={formik.handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Cidade:</Form.Label>
                <Form.Control
                  id="complement"
                  name="complement"
                  label="Complemento"
                  value={formik.values.complement}
                  onChange={formik.handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Estado:</Form.Label>
                <Form.Control
                  id="complement"
                  name="complement"
                  label="Complemento"
                  value={formik.values.complement}
                  onChange={formik.handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Complemento:</Form.Label>
                <Form.Control
                  id="complement"
                  name="complement"
                  label="Complemento"
                  placeholder="Complemento"
                  value={formik.values.complement}
                  onChange={formik.handleChange}
                />
              </Col>
            </Row>
          </Form.Group>

          <Button variant="success" type="submit">
            Cadastrar Cliente
          </Button>
        </form>
      </Col>

      <Table className="mt-5" responsive striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>CPF/CNPJ</th>
            <th>CEP</th>
            <th>Bairro</th>
            <th>Rua</th>
            <th>Numero</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>(73) 3214-600</td>
            <td>45600000</td>
            <td>Bairro jaçanã</td>
            <td>Rua de palha</td>
            <td>50</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Page;
