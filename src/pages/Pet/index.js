import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form, Modal, Col, Button, Row } from "react-bootstrap";
import { Typography, Container, TableCell, Table, TableBody, TableHead, TableRow, SvgIcon, TextField } from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
//import { Container } from "./styled";
import Api from "../../helpers/Api";
import * as yup from "yup";
import { useFormik } from "formik";
import getValidationError from "../../utils/getValidationError";
import { useToast } from "../../hooks/toast";
import Swal from 'sweetalert2';
import api from "../../helpers/Api";
import { margin } from "polished";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { propTypes } from "react-bootstrap/esm/Image";

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
  birthday: propTypes.Date,
  cor: "",
  raca: "",
  recommendations: "",
};

const useStyles = makeStyles((theme) => ({
  textField: {
    "& > *": {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    }
  },
}));


const Pets = () => {
  const [show, setShow] = useState(false);
  const handleModal = () => setShow(!show ? true : false);
  const { addToast } = useToast();
  const [pets, setPets] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(null);
  const classes = useStyles();

  const loadPets = async () => {
    await api.get("pets/findAll").then(response => {
      setPets(response.data);
    })
  }


  const deletePets = async (id) => {
    await api.delete("pets/" + id).then(response => {
      setPets([...pets.filter(p => p.id !== id)]);
    });
  }

  useEffect(() => {
    loadPets();
  }, []);

  const formik = useFormik({


    initialValues: initialValues,

    validationSchema: schema,

    onSubmit: useCallback(async (data, {setStatus, setSubmitting}) => {
      try {

        await schema.validate(data, {
          abortEarly: false
        });

        let parameter = {
          name: data.name,
          doctorName: data.doctorName,
          color: data.cor,
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
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Erro na Atualização',
          showConfirmButton: false,
          timer: 2000
        })
      };


    }, [addToast])

  });
  const updatePet = async (pet) => {
    setIsEdit(true);
    handleModal();
    formik.values.name = pet.name;
    formik.values.doctorName = pet.doctorName;
    formik.values.cor = pet.cor;
    formik.values.raca = pet.raca;
    formik.values.recommendations = pet.raca;
    formik.values.sex = pet.sex;
    formik.values.birthday = new Date(pet.birthday);
  };


  const handleChangeUpdate = async (e) => {
    e.preventDefault();
    try {
      let parameter = {
        name: formik.values.name,
        doctorName: formik.values.doctorName,
        color: formik.values.cor,
        sex: formik.values.sex,
        birthday: formik.values.birthday
      }
      await api.put("/pets/" + id, parameter).then(resp => {
        handleModal();
        setId(null);
        setIsEdit(false);
        loadPets();
        cleanFormik();
      })
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
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Erro na Atualização',
        showConfirmButton: false,
        timer: 2000
      })
    };

  };

  const cleanFormik = () => {
    formik.values.name = "";
    formik.values.cor = "";
    formik.values.raca = "";
    formik.values.recommendations = "";
    formik.values.doctorName = "";
    formik.values.sex = "";
    formik.values.birthday = new Date();
    setIsEdit(false);
  };

  const formatDate = (dt) => {
    let date = new Date(dt);
    return (date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
  }

  return (
    <Container maxWidth="xl" >
      <SvgIcon style={{ fontSize: 50, color: "blue" }}
        component={AddCircleIcon}
        onClick={handleModal}
      />

      <Modal
        show={show}
        onHide={handleModal}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton onHide={() => cleanFormik()} >
          <Modal.Title>{(isEdit && "Atualizar Pet") || "Cadastro do Pet"}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form onSubmit={(isEdit && handleChangeUpdate) || formik.handleSubmit} noValidate>
            <Form.Row>
              <Form.Group as={Col} controlId="name">
                <TextField
                  fullWidth
                  required
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  label="Nome: "
                  className={classes.textField}
                  variant="outlined"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="doctorName">
                <TextField
                  fullWidth
                  id="doctorName"
                  name="doctorName"
                  value={formik.values.doctorName}
                  onChange={formik.handleChange}
                  error={formik.touched.doctorName && Boolean(formik.errors.doctorName)}
                  helperText={formik.touched.doctorName && formik.errors.doctorName}
                  label="Veterinario"
                  className={classes.textField}
                  variant="outlined"
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <fieldset style={{marginLeft: '20px'}}>
                <Form.Group as={Row} controlId="sex">
                  <Form.Label as="legend" column sm={4}>
                    Sexo
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Check
                      type="radio"
                      label="Masculino"
                      name="sex"
                      value="Masculino"
                      onChange={formik.handleChange}
                      checked={"Masculino" === formik.values.sex}
                      isInvalid={formik.touched.sex && Boolean(formik.errors.sex)}
                    />
                    <Form.Check
                      type="radio"
                      label="Feminino"
                      name="sex"
                      value="Feminino"
                      onChange={formik.handleChange}
                      checked={"Feminino" === formik.values.sex}
                      isInvalid={formik.touched.sex && Boolean(formik.errors.sex)}
                    />
                  </Col>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.sex}
                  </Form.Control.Feedback>
                </Form.Group>
              </fieldset>

              <Form.Group as={Col} controlId="birthday">
                <TextField
                  type="date"
                  name="birthday"
                  label="Data de Nascimento"
                  variant="outlined"
                  value={formik.values.birthday}
                  onChange={formik.handleChange}
                  error={formik.touched.birthday && Boolean(formik.errors.birthday)}
                  helperText={formik.touched.birthday && formik.errors.birthday}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="cor">
                <TextField
                  fullWidth
                  select
                  id="cor"
                  name="cor"
                  variant="outlined"
                  label=" Cor do Pet"
                  value={formik.values.cor}
                  checked={  cores.find(cor => cor.name === formik.values.cor)}
                  onChange={formik.handleChange}
                  className={classes.textField}
                  onBlur={formik.handleBlur}
                  error={formik.touched.cor && Boolean(formik.errors.cor)}
                  helperText={formik.touched.cor && formik.errors.cor}
                >
                  <option value="">-- Nenhum --</option>
                  {cores.map(cor => {
                    return (
                      <option key={cor.id} value={cor.cor}>{cor.cor}</option>)
                  })
                  }
                </TextField>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <TextField
                  id="raca"
                  name="raca"
                  value={formik.values.raca}
                  onChange={formik.handleChange}
                  error={formik.touched.raca && Boolean(formik.errors.raca)}
                  helperText={formik.touched.raca && formik.errors.raca}
                  label="Veterinario"
                  className={classes.textField}
                  variant="outlined"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="id-description">
                <TextField
                  fullWidth
                  multiline
                  variant="outlined"
                  rows={4}
                  className={classes.textField}
                  name="recommendations"
                  label="Recomendações"
                  value={formik.values.recommendations}
                  onChange={formik.handleChange}
                  error={formik.touched.raca && Boolean(formik.errors.raca)}
                  helperText={formik.touched.raca && formik.errors.raca}
                />
              </Form.Group>
            </Form.Row>
            <Button type="submit">{(isEdit && "Editar Pet") || "Cadastrar"} </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Typography variant="h4" style={style}>Pets Cadastrados</Typography>
      <hr />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Nome Pet</TableCell>
            <TableCell align="right">Nome Veterinario</TableCell>
            <TableCell align="right">Sexo</TableCell>
            <TableCell align="right">Aniversario</TableCell>
            <TableCell align="right">Dono</TableCell>
            <TableCell align="right">Cor</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {pets.map(pet => (
            <TableRow key={pet.id}>
              <TableCell component="th" scope="pet">
                {pet.id}
              </TableCell>
              <TableCell align="right">{pet.name}</TableCell>
              <TableCell align="right">{pet.doctorName}</TableCell>
              <TableCell align="right">{pet.sex}</TableCell>
              <TableCell align="right">{formatDate(pet.birthday)}</TableCell>
              <TableCell align="right">{pet.user}</TableCell>
              <TableCell align="right">{pet.color}</TableCell>
              <TableCell align="right" >
                <CreateIcon onClick={() => updatePet(pet)} />
                <DeleteIcon style={{ margin: "10px 10px 0 15px" }} onClick={() => deletePets(pet.id)} />
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>


    </Container >
  );


}

const style = {
  display: 'flex',
  justifyContent: 'center'
}

export default Pets;