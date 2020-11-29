import React, { useCallback, useEffect, useState } from "react";
import { Form, Modal, Col, Button, Row } from "react-bootstrap";
import { Container } from "./styled";
import Api from "../../helpers/Api";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object().shape({

});
const initialValues = {};

const Pets = () => {
  const [show, setShow] = useState(false);
  const handleModal = () => setShow(!show ? true : false);
  const formik = useFormik({
    initialValues: {},

    validationSchema: validationSchema,
    onSubmit: useCallback(async (data) => {
      console.log(data);
      try {

      } catch (error) {

      };

    }, []),

    onReset: undefined

  });




  return (
    <Container>
      <h1>laksdlkajsdklas</h1>
      <button onClick={handleModal}>
        aqui
    </button>
      <Modal show={show} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro do Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form onReset={formik.resetForm} onSubmit={formik.handleSubmit} noValidate>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Nome Pet: </Form.Label>
                <Form.Control 
                  type="text"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  isValid={formik.touched.firstName && !formik.errors.firstName}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Raça</Form.Label>
                <Form.Control as="select" defaultValue="--Nenhunma--">
                  <option>"--Nenhuma--"</option>
                  <option>...</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control as="select" defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Control>
              </Form.Group>


            </Form.Row>
            <Button type="submit">Submit form</Button>
          </Form>
        </Modal.Body>
      </Modal>

    </Container >
  );


}

export default Pets;