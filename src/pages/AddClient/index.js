import React, { useCallback, useEffect, useState } from "react";
import { FaMapMarkerAlt, FaEdit, FaTrash } from "react-icons/fa";
import CepApi from "../../helpers/CepApi";
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
import api from "../../helpers/Api";

const Page = () => {
  const [id, setId] = useState();
  const [clients, setClients] = useState([]);
  const [cep, setCep] = useState("");
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const [complement, setComplment] = useState("");
  const [number, setNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  const [edit, setEdit] = useState(false);

  const handleClose = () => {
    cleanForm();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  function handleCEP(cep) {
    loadCep(cep);
  }

  async function loadClients() {
    const response = await api.get("/user/findAll");

    setClients(response.data);
    console.log(response.data);
  }
  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    if (cep.length == 8) {
      loadCep(cep);
    }
  }, [cep]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      cpfCnpj: cpfCnpj,
      phone: phone,
      address: {
        cep: cep,
        nmCity: city,
        nmState: state,
        street: street,
        complement: complement,
        number: number,
        neighborhood: neighborhood,
      },
    };
    console.log(data);
    try {
      await api.post("/user", data);
      loadClients();
      cleanForm();
    } catch {
      console.log("erro");
    }
  }

  async function loadCep(cep) {
    const response = await CepApi.get(`${cep}/json`);

    const { logradouro, complemento, bairro, localidade, uf } = response.data;
    setCity(localidade);
    setState(uf);
    setStreet(logradouro);
    setNeighborhood(bairro);
    setComplment(complemento);
  }

  function cleanForm() {
    setName("");
    setEmail("");
    setPhone("");
    setCpfCnpj("");
    setCity("");
    setState("");
    setStreet("");
    setNeighborhood("");
    setComplment("");
    setCep("");
    setNumber("");
  }

  function showAddress(client) {
    setName(client.name);
    setCep(client.address.cep ? client.address.cep : "");
    setStreet(client.address.street ? client.address.street : "");
    setCity(client.address.nmCity ? client.address.nmCity : "");
    setState(client.address.nmState ? client.address.nmState : "");
    setComplment(client.address.complement ? client.address.complement : "");
    setNumber(client.address.number ? client.address.number : "");
    setNeighborhood(
      client.address.neighborhood ? client.address.neighborhood : ""
    );
    console.log(client);
    handleShow();
  }

  async function handleDelete(id) {
    await api.delete(`/user/${id}`);
    loadClients();
  }

  const loadUpdate = (client) => {
    setEdit(true);
    setId(client.id);
    setName(client.name ? client.name : "");
    setEmail(client.email ? client.email : "");
    setPhone(client.phone ? client.phone : "");
    setCpfCnpj(client.cpfCnpj ? client.cpfCnpj : "");
    setCep(client.address.cep ? client.address.cep : "");
    setStreet(client.address.street ? client.address.street : "");
    setCity(client.address.nmCity ? client.address.nmCity : "");
    setState(client.address.nmState ? client.address.nmState : "");
    setComplment(client.address.complement ? client.address.complement : "");
    setNumber(client.address.number ? client.address.number : "");
    setNeighborhood(
      client.address.neighborhood ? client.address.neighborhood : ""
    );
  };

  async function handleUpdate(e) {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      cpfCnpj: cpfCnpj,
      phone: phone,
      address: {
        cep: cep,
        nmCity: city,
        nmState: state,
        street: street,
        complement: complement,
        number: number,
        neighborhood: neighborhood,
      },
    };
    try {
      await api.put(`user/${id}`, data);
      loadClients();
      cleanForm();
      setEdit(false);
    } catch {
      console.log("erro");
    }
  }

  return (
    <Container style={{ marginTop: 20 }}>
      <Col id="topo" md={12}>
        <Form onSubmit={edit ? handleUpdate : handleSubmit}>
          <h1>{edit ? "Edição de usuario" : "Dados Cadastrais"} </h1>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required="email"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Label>Telefone:</Form.Label>
                <Form.Control
                  id="phone"
                  name="phone"
                  placeholder="Telefone ou celular"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
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
                  value={cpfCnpj}
                  onChange={(e) => setCpfCnpj(e.target.value)}
                  required
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
                  required
                />
              </Col>

              <Col>
                <Form.Label>Rua:</Form.Label>
                <Form.Control
                  id="street"
                  name="street"
                  label="Rua"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
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
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
              </Col>
              <Col>
                <Form.Label>Bairro:</Form.Label>
                <Form.Control
                  id="neighborhood"
                  name="neighborhood"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  required
                />
              </Col>
              <Col>
                <Form.Label>Cidade:</Form.Label>
                <Form.Control
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </Col>
              <Col>
                <Form.Label>Estado:</Form.Label>
                <Form.Control
                  id="state"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </Col>
              <Col>
                <Form.Label>Complemento:</Form.Label>
                <Form.Control
                  id="complement"
                  name="complement"
                  value={complement}
                  onChange={(e) => setComplment(e.target.value)}
                  required
                />
              </Col>
            </Row>
          </Form.Group>

          <Button type="submit" variant="success">
            {edit ? "Editar cliente" : "Cadastrar Cliente"}
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
                <a href="#topo">
                  <FaEdit onClick={(e) => loadUpdate(client)} />
                </a>
                <FaTrash onClick={(e) => handleDelete(client.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Endereço - {name} </Modal.Title>
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
                <td>{cep ? cep : ""}</td>
                <td>{state ? state : ""}</td>
                <td>{city ? city : ""}</td>
                <td>{neighborhood ? neighborhood : ""}</td>
                <td>{street ? street : ""}</td>
                <td>{number ? number : ""}</td>
                <td>{complement ? complement : ""}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Page;
