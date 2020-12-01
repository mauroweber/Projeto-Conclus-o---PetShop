import React, { useCallback, useEffect, useState } from "react";
import { Form, Modal, Col, Button, Row } from "react-bootstrap";
import { TextField } from "@material-ui/core"
import { Container } from "./styled";
import Api from "../../helpers/Api";
import * as yup from "yup";
import { useFormik } from "formik";
import getValidationError from "../../utils/getValidationError";
import { useToast } from "../../hooks/toast";
import Swal from 'sweetalert2';

const cores = [
  { id: 1, cor: "Preto" },
  { id: 2, cor: "Branco" },
  { id: 3, cor: "Marron" },
  { id: 4, cor: "Beje" },
  { id: 5, cor: "Pintado" },
  { id: 6, cor: "Mestiço" },
];

const pet = [
  { id: 1, tipo: "Cachorro" },
  { id: 2, tipo: "Gato" },
];

const port = [
  { id: 1, porte: "Grande" },
  { id: 2, porte: "Medio" },
  { id: 3, porte: "Pequeno" },
];

const schema = yup.object().shape({
  name: yup.string().required("Insira o nome do Pet"),
  sex: yup.string().oneOf(["masculino", "feminino"]).required("Sexo do Animal Obrigatorio"),
  birthday: yup.date().required("Coloque a date de Nascimento"),
});

const initialValues = {
  name: "",
  doctorName: "",
  sex: "",
  birthday: new Date(),
  cor: "",
  raca: "",
  recommendations: "",
};

const Pets = () => {
  const [show, setShow] = useState(false);
  const handleModal = () => setShow(!show ? true : false);
  const { addToast } = useToast();



  const formik = useFormik({
    initialValues: initialValues,

    validationSchema: schema,

    onSubmit: useCallback(async (data) => {
      console.log(data);
      try {
        await schema.validate(data, {
          abortEarly: false
        })

        let parameter = {
          name: data.name,
          doctorName: data.doctorName,
          color: data.color,
          sex: data.sex
        }

        await Api.post("/pets", parameter)
          .then(response => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            })
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
          error.erros.map((e) => {
            addToast({
              type: 'error',
              title: "Erro Autenticação da Pagina",
              description: e
            });
          });
          return;
        }
      };

    }, []),

    onReset: { initialValues },

  });





  return (
    <Container>
      <h1>Page Pets</h1>
      <button onClick={handleModal}>
        Cadastrar Pet
    </button>
      <Modal
        show={show}
        onHide={handleModal}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro do Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form onReset={formik.resetForm} onSubmit={formik.handleSubmit} noValidate>
            <Form.Row>
              <Form.Group as={Col} controlId="name">
                <Form.Label>Nome Pet: </Form.Label>
                <Form.Control
                  required
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  // isValid={formik.touched.name && Boolean(formik.errors.name)}
                  isInvalid={formik.touched.name && Boolean(formik.errors.name)}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.name}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid" tooltip>Looks good!</Form.Control.Feedback>
                {/* <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Nome"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                /> */}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="doctorName">
                <Form.Label>Nome Veterinário: </Form.Label>
                <Form.Control
                  name="doctorName"
                  value={formik.values.doctorName}
                  onChange={formik.handleChange}
                  isValid={formik.touched.doctorName && !formik.errors.doctorName}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.name}
                </Form.Control.Feedback>
                <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <fieldset>
                <Form.Group as={Row} controlId="sex">
                  <Form.Label as="legend" column sm={3}>
                    Sexo
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Check
                      type="radio"
                      label="Masculino"
                      name="sex"
                      value="masculino"
                      onChange={formik.handleChange}
                      isInvalid={!!formik.errors.sex}
                    />
                    <Form.Check
                      type="radio"
                      label="Feminino"
                      name="sex"
                      value="feminino"
                      isInvalid={formik.errors.sex}
                    />
                  </Col>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.sex}
                  </Form.Control.Feedback>
                  <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </fieldset>

              <Form.Group as={Col} controlId="birthday">
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control
                  type="date"
                  name="birthday"
                  value={formik.values.birthday}
                  onChange={formik.handleChange}
                  isValid={formik.touched.birthday && !formik.errors.birthday}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>

              <Form.Group as={Col} controlId="cor">
                <Form.Label>Cor Pet</Form.Label>
                <Form.Control
                  as="select"
                  name="cor"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isValid={formik.touched.cor && !formik.errors.cor}
                >
                  <option value="defaul">-- Nenhum --</option>
                  {cores.map(cor => {
                    return (
                      <option value={cor.id}>{cor.cor}</option>)
                  })
                  }
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Raça: </Form.Label>
                <Form.Control
                  name="raca"
                  value={formik.values.raca}
                  onChange={formik.handleChange}
                  isValid={formik.touched.raca && !formik.errors.raca}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="id-description">
                <Form.Label>Restrições/Observação</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="recommendations"
                  value={formik.values.recommendations}
                  onChange={formik.handleChange}
                  required
                />
              </Form.Group>
            </Form.Row>
            <Button type="submit">Cadastrar </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </Container >
  );


}

export default Pets;