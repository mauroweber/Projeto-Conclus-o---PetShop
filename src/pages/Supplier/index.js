import React, { useCallback, useState, useEffect } from "react";
import {
  Form,
  Modal,
  Col,
  Button,
  Row,
  Table,
  Container,
} from "react-bootstrap";
// import { Container } from "./styled";
import Api from "../../helpers/Api";
import * as yup from "yup";
import { useFormik } from "formik";
import getValidationError from "../../utils/getValidationError";
import { useToast } from "../../hooks/toast";
import { FaTrash, FaEdit } from "react-icons/fa";

const token = localStorage.getItem("");

const schema = yup.object().shape({
  name: yup.string().required("Insira a Razão Social do Forncedor"),
  companyName: yup.string().required("Insera o Nome Fantasia da Empresa"),
});

const initialValues = {
  name: "",
  companyName: "",
  phone: "",
  cpfCnpj: "",
  address: "",
};

const Supplier = () => {
  const [show, setShow] = useState(false);
  const handleModal = () => setShow(!show ? true : false);
  const { addToast } = useToast();
  const [supliers, setSuppliers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [idEdit, setIdEdit] = useState();

  async function loadSupplier() {
    const response = await Api.get("/suplier/findAll");
    setSuppliers(response.data);
  }

  async function handleDelete(id) {
    await Api.delete(`/suplier/${id}`);
    loadSupplier();
  }

  useEffect(() => {
    loadSupplier();
  }, []);

  const formik = useFormik({
    initialValues: initialValues,

    validationSchema: schema,

    onSubmit: useCallback(async (data) => {
      //console.log(data);
      try {
        await schema.validate(data, {
          abortEarly: false,
        });

        let parameter = {
          name: data.name,
          companyName: data.companyName,
          phone: data.phone,
          cpfCnpj: data.cpfCnpj,
        };

        await Api.post("/suplier", parameter).then((response) => {
          loadSupplier();
          setShow(false);
          formik.resetForm();
        });
      } catch (error) {
        if (error instanceof yup.ValidationError) {
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
      }
    }, []),
  });

  async function loadUpdate(id, name, companyName, phone, cpfCnpj) {
    formik.values.name = name;
    formik.values.companyName = companyName;
    formik.values.phone = phone;
    formik.values.cpfCnpj = cpfCnpj;
    setIdEdit(id);
    setEdit(true);
    handleModal();
  }

  async function handleUpdate(id) {
    console.log(id);
  }

  return (
    <Container>
      <h1>CADASTRAR FORNECEDOR</h1>
      <button onClick={handleModal}>CADASTRAR FORNECEDOR</button>
      <Modal
        show={show}
        onHide={handleModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {(edit && "EDIÇÃO DE FORNECEDOR") || "CADASTRO DE FORNECEDOR"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onReset={formik.resetForm}
            onSubmit={(edit && handleUpdate(idEdit)) || formik.handleSubmit}
            noValidate
          >
            <Form.Row>
              <Form.Group as={Col} controlId="name">
                <Form.Label>Razão Social: </Form.Label>
                <Form.Control
                  required
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.name && Boolean(formik.errors.name)}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="companyName">
                <Form.Label>Nome Fantasia: </Form.Label>
                <Form.Control
                  name="companyName"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.companyName &&
                    Boolean(formik.errors.companyName)
                  }
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.companyName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="phone">
                <Form.Label>Telefone:</Form.Label>
                <Form.Control
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  isValid={formik.touched.phone && !formik.errors.phone}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="cpfCnpj">
                <Form.Label>CNPJ: </Form.Label>
                <Form.Control
                  name="cpfCnpj"
                  value={formik.values.cpfCnpj}
                  onChange={formik.handleChange}
                  isValid={formik.touched.cpfCnpj && !formik.errors.cpfCnpj}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.cpfCnpj}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="address">
                <Form.Label>Endereço: </Form.Label>
                <Form.Control
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  isValid={formik.touched.address && !formik.errors.address}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.address}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Button type="submit">
              {(edit && "Editar Fornecedor") || "Cadastrar Fornecedor"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Razão Social</th>
            <th>Nome Fantasia</th>
            <th>Telefone</th>
            <th>CNPJ/CPF</th>
            <th>Endereço</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {supliers.map((sup) => (
            <tr>
              <td>{sup.name}</td>
              <td>{sup.companyName}</td>
              <td>{sup.phone}</td>
              <td>{sup.cpfCnpj}</td>
              <td>{sup.address}</td>
              <td>
                <FaTrash onClick={(e) => handleDelete(sup.id)} />
                <FaEdit
                  onClick={(e) =>
                    loadUpdate(
                      sup.id,
                      sup.name,
                      sup.companyName,
                      sup.phone,
                      sup.cpfCnpj
                    )
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Supplier;
