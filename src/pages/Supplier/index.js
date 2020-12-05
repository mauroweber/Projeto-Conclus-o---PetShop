import React, { useCallback, useState, useEffect } from "react";
import {
  Form,
  Modal,
  Col,
  Button,
  Row,
  Card,
  Table,
  Container,
  Badge,
} from "react-bootstrap";
import "./styled.css";
import Api from "../../helpers/Api";
import * as yup from "yup";
import { useFormik } from "formik";
import getValidationError from "../../utils/getValidationError";
import { useToast } from "../../hooks/toast";
import { FaTrash, FaEdit } from "react-icons/fa";
import { CpfMask } from "../../components/mask";

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

  function handleOut() {
    setEdit(false);
    formik.values.name = "";
    formik.values.companyName = "";
    formik.values.phone = "";
    formik.values.cpfCnpj = "";
    setShow(false);
  }

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
          //console.log(parameter);
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

  function loadUpdate(id, name, companyName, phone, cpfCnpj) {
    formik.values.name = name;
    formik.values.companyName = companyName;
    formik.values.phone = phone;
    formik.values.cpfCnpj = cpfCnpj;
    setIdEdit(id);
    setEdit(true);
    handleModal();
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const parameter = {
      name: formik.values.name,
      companyName: formik.values.companyName,
      phone: formik.values.phone,
      cpfCnpj: formik.values.cpfCnpj,
    };
    console.log(parameter);
    await Api.put(`/suplier/${idEdit}`, parameter);
    setEdit(false);
    setShow(false);
    loadSupplier();
    //Limpa os dados do Modal depois de editado
    formik.values.name = "";
    formik.values.companyName = "";
    formik.values.phone = "";
    formik.values.cpfCnpj = "";
  }

  return (
    <Col>
      <Col style={{ textAlign: "center" }}>
        <Button
          variant="dark"
          className="btn-open-suplier"
          onClick={handleModal}
        >
          CADASTRAR FORNECEDOR
        </Button>
      </Col>

      <Row>
        {supliers.map((sup) => (
          <Col key={sup.id} sm={12} md={6} lg={4}>
            <Card style={{ marginTop: 15 }} className="card-suplier">
              <Card.Header
                style={{ color: "#ffffff", background: "#e67e22" }}
                as="h6"
              >
                {sup.name}
              </Card.Header>
              <Card.Body style={{ margin: 0 }}>
                <p>
                  <strong className="text-card">Razão Social:</strong>
                  {sup.companyName}
                  <FaEdit
                    className="icon-card"
                    style={{ color: "#DAA520", float: "right" }}
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
                </p>
                <p>
                  <strong className="text-card">telefone:</strong> {sup.phone}
                </p>
                <p>
                  <strong className="text-card">CPF/CNPJ:</strong>
                  {sup.cpfCnpj}

                  <FaTrash
                    className="icon-card"
                    style={{ float: "right", color: "crimson" }}
                    onClick={(e) => handleDelete(sup.id)}
                  />
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        show={show}
        onHide={handleModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            {edit ? "EDIÇÃO DE FORNECEDOR" : "CADASTRO DE FORNECEDOR"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onReset={formik.resetForm}
            onSubmit={(edit && handleUpdate) || formik.handleSubmit}
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
                  pattern="\([0-9]{2}\)[0-9]{4,6}-[0-9]{3,4}$"
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
            <div>
              <Button type="submit" variant="success" size="lg">
                {(edit && "Editar Fornecedor") || "Cadastrar Fornecedor"}
              </Button>
              <Button variant="danger" size="sm" onClick={handleOut}>
                Sair
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Col>
  );
};

export default Supplier;
