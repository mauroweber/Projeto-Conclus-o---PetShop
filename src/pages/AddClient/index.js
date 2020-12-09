import React, { useCallback, useEffect, useState } from "react";
import {
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
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
  Modal,
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
  state: "",
  city: "",
  neighborhood: "",
  cep: "",
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
  const [cep, setCep] = useState("");
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    city: "",
    state: "",
    street: "",
    complement: "",
    number: "",
  });

  const handleClose = (data) => setShow(false);
  const handleShow = (data) => setShow(true);

  function handleCEP(cep) {
    if (cep.length < 7) {
      alert("Inserir os 8 digitos do CEP");
    } else if (cep.length == 8) {
      console.log("Funcionando" + cep);
      loadCep(cep);
    }
  }

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
      async (data) => {
        try {
          await schema.validate(data, {
            abortEarly: false,
          });

          var parameter = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            cpfCnpj: data.cpfCnpj,
            address: {
              street: data.street,
              complement: data.complement,
              number: data.number,
              nmCity: data.city,
              nmState: data.state,
              neighborhood: data.neighborhood,
              cep: cep,
            },
          };
          await api
            .post("/user", parameter)
            .then((response) => {
              addToast({
                type: "success",
                title: "Usuario cadastrado com Sucesso",
              });
              loadClients();
              formik.resetForm();
              cleanForm();
            })
            .catch((error) => {
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

  async function loadCep(cep) {
    const response = await CepApi.get(`${cep}/json`);

    const { logradouro, complemento, bairro, localidade, uf } = response.data;
    formik.values.complement = complemento;
    formik.values.street = logradouro;
    formik.values.neighborhood = bairro;
    formik.values.city = localidade;
    formik.values.state = uf;
  }

  function cleanForm() {
    formik.values.name = "";
    formik.values.cpfCnpj = "";
    formik.values.neighborhood = "";
    formik.values.city = "";
    formik.values.state = "";
    formik.values.street = "";
    formik.values.complement = "";
    formik.values.number = "";
    formik.values.phone = "";
    formik.values.email = "";
    formik.values.neighborhood = "";
    setCep("");
  }

  function showAddress(client) {
    setCep(client.cep);
    setAddress({
      name: client.name ? client.name : "",
      city: client.address ? client.address.nmCity : "",
      state: client.address ? client.address.nmState : "",
      street: client.address ? client.address.street : "",
      complement: client.address ? client.address.complement : "",
      number: client.address ? client.address.number : "",
    });
    // formik.values.neighborhood = client.address
    //   ? client.address.neighborhood
    //   : "";
    // formik.values.city = client.address ? client.address.nmCity : "";
    // formik.values.state = client.address ? client.address.nmState : "";
    // formik.values.street = client.address ? client.address.street : "";
    // formik.values.complement = client.address ? client.address.complement : "";
    // formik.values.number = client.address ? client.address.number : "";
    // console.log(formik.values.city);
    handleShow(address);
  }

  async function handleDelete(id) {
    console.log(id);
    await api.delete(`/user/${id}`);
    loadClients();
  }

  return (
    <Container style={{ marginTop: 20 }}>
      <Col md={12}>
        <Form
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
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                />
              </Col>
              <Button onClick={(e) => handleCEP(cep)}>Busca CEP</Button>
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
                  id="number"
                  name="number"
                  label="number"
                  value={formik.values.number}
                  onChange={formik.handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Bairro:</Form.Label>
                <Form.Control
                  id="neighborhood"
                  name="neighborhood"
                  value={formik.values.neighborhood}
                  onChange={formik.handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Cidade:</Form.Label>
                <Form.Control
                  id="city"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Estado:</Form.Label>
                <Form.Control
                  id="state"
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Complemento:</Form.Label>
                <Form.Control
                  id="complement"
                  name="complement"
                  value={formik.values.complement}
                  onChange={formik.handleChange}
                />
              </Col>
            </Row>
          </Form.Group>

          <Button type="submit" variant="success">
            Cadastrar Cliente
          </Button>
        </Form>
      </Col>

      <Table
        style={{ textAlign: "center" }}
        className="mt-5"
        responsive
        striped
        bordered
        hover
      >
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>CPF/CNPJ</th>
            <th>Endereço</th>
            <th>Ação</th>
            {/* <th>CEP</th>
            <th>Estado</th>
            <th>Cidade</th>
            <th>Bairro</th>
            <th>Rua</th>
            <th>Numero</th>
            <th>Complemento</th> */}
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>{client.cpfCnpj}</td>
              <td>
                <FaMapMarkerAlt onClick={(e) => showAddress(client)} />
              </td>
              <td>
                <FaEdit />
                <FaTrash onClick={(e) => handleDelete(client.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Endereço - {address.name} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table
            style={{ textAlign: "center" }}
            className="mt-2"
            responsive
            striped
            bordered
            hover
          >
            <thead>
              <tr>
                <th>CEP</th>
                <th>Estado</th>
                <th>Cidade</th>
                <th>Bairro</th>
                <th>Rua</th>
                <th>Numero</th>
                <th>Complemento</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{address.cep ? address.cep : ""}</td>
                <td>{address.state ? address.state : ""}</td>
                <td>{address.city ? address.city : ""}</td>
                <td>{address.neighborhood ? address.neighborhood : ""}</td>
                <td>{address.street ? address.street : ""}</td>
                <td>{address.number ? address.number : ""}</td>
                <td>{address.complement ? address.complement : ""}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Page;
