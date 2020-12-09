import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Col, Button, Row, Form } from 'react-bootstrap';
import { Typography, Container, TableCell, Table, TableBody, TableHead, TableRow, SvgIcon, TextField, MenuItem, makeStyles } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
//import { Container } from './styled';
import Api from '../../helpers/Api';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import api from '../../helpers/Api';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { AppsTwoTone } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  textField: {
    '& > *': {
      marginLeft: theme.spacing(),
      marginRight: theme.spacing(),
    }
  },
}));

const initialValues = {
  name: '',
  doctorName: '',
  sex: '',
  birthday: new Date(),
  color: '',
  raca: '',
  recommendations: '',
    user: {},
};

const schema = yup.object().shape({
  name: yup.string().required('Preencho o nome'),
  // doctorName: yup.string().required("Digite"),
  // sex: yup.string().oneOf(["Masculino", "Feminino"]).required('Sexo do Animal Obrigatorio'),
  // birthday: yup.date().required('Coloque a date de Nascimento'),
});


const Pets = () => {
  const [show, setShow] = useState(false);
  const handleModal = () => setShow(!show ? true : false);
  const [pets, setPets] = useState([]);
  const [pet, setPet] = useState({});
  const [edit, setEdit] = useState(false);
  const [clients, setClients] = useState([]);
  const classes = useStyles();

  const formik = useFormik({
    initialValues: initialValues,

    validationSchema: schema,

    onSubmit: useCallback(async (values) => {
      try {
        await schema.validate(values, {
          abortEarly: false
        })
        formik.setStatus();
        // if (edit) {
        //   await update(values);
        // } else {
        //   await create(values);
        // }

      } catch (e) {
        Swal.fire({
          position: 'top-end',
          icon: 'error ',
          title: 'Aconteceu algo inesperado!',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }, [pet, edit, show, pets]),

  });

  const loadPets = async () => {
    await api.get('pets/findAll').then(response => {
      setPets(response.data);
    })
  }

  const loadClients = async () => {
   await api.get('user/findAll').then(response => {
      setClients(response.data);
    })
  }


  const deletePets = async (id) => {
    await api.delete('pets/' + id).then(response => {
      setPets([...pets.filter(p => p.id !== id)]);
    });
  }

  const create = async (data) => {
    let parameter = {
      name: data.name,
      doctorName: data.doctorName,
      color: data.color,
      sex: data.sex,
      raca: data.raca,
      recommendations: [{ name: data.recommendations }],
      user: data.user
    }

    await Api.post('/pets', parameter)
      .then((response) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Foi Inserido na Base com Sucesso!',
          showConfirmButton: false,
          timer: 2000
        })
        setPets([...pets, response.data])
        handleModal();
        setField(initialValues);
        setPet({});
        setEdit(false);
      }).catch((error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Erro na Atualização',
          showConfirmButton: false,
          timer: 2000
        });
        formik.setSubmitting(false);
        alert('Erro na atualização');
      });
  }

  const update = async (data) => {
    const parameter = pet;
    parameter.name = data.name;
    parameter.doctorName = data.doctorName;
    parameter.color = data.color;
    parameter.sex = data.sex;
    parameter.birthday = data.birthday;
    parameter.raca = data.raca;
    if (parameter.recommendations.length > 0) {
      parameter.recommendations[0].name = data.recommendations;
    } else {
      parameter.recommendations.push({ name: data.recommendations });
    }

    await api.put('/pets/' + pet.id, parameter)
      .then((response) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Foi Alterado com Sucesso!',
          showConfirmButton: false,
          timer: 2000
        })
        handleModal();
        setEdit(false);
        setField(initialValues);
        setPets([...pets.map(p => {
          if (pet.id === p.id) {
            p = response.data;
          }
          return p;
        })]);
        setPet({});
      }).catch((e) => {
        formik.setSubmitting(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Erro na Atualização',
          showConfirmButton: false,
          timer: 2000
        })
      });
  }

  const handleChangeUpdate = (pet) => {
    setField(pet);
    setEdit(true);
    setPet(pet);
    handleModal();
  };

  const setField = (obj) => {
    const fields = ['name', 'doctorName', 'birthday', 'sex', 'color', 'raca'];
    fields.forEach(field => formik.setFieldValue(field, obj[field], false));
    if (obj.recommendations.length > 0) {
      formik.setFieldValue('recommendations', obj.recommendations[0].name, false);
    } else {
      formik.setFieldValue('recommendations', obj.recommendations, false);
    }
  }

  const formatDate = (dt) => {
    let date = new Date(dt);
    return (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
  }

  const closeModal = () => {
    setField(initialValues);
    setEdit(false);
    setPet({});
  }

  useEffect(() => {
    loadPets();
    loadClients();
  }, [])

  return (
    <Container maxWidth='xl' >
      <SvgIcon style={{ fontSize: 50, color: 'blue' }}
        component={AddCircleIcon}
        onClick={handleModal}
      />

      <Modal
        show={show}
        onHide={handleModal}
        backdrop='static'
        keyboard={false}>
        <Modal.Header closeButton onHide={closeModal} >
          <Modal.Title>{(edit && 'Atualizar PACOTE') || 'Novo Pacote'}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form onReset={formik.resetForm} onSubmit={formik.handleSubmit} noValidate>
            <Form.Row>
              <Form.Group as={Col} controlId='name'>
                <TextField
                  fullWidth
                  required
                  id='name'
                  name='name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  label='Nome: '
                  className={classes.textField}
                  variant='outlined'
                />
              </Form.Group>
            </Form.Row>
            {/* <Form.Row>
              <Form.Group as={Col} controlId='doctorName'>
                <TextField
                  fullWidth
                  id='doctorName'
                  name='doctorName'
                  value={formik.values.doctorName}
                  onChange={formik.handleChange}
                  error={formik.touched.doctorName && Boolean(formik.errors.doctorName)}
                  helperText={formik.touched.doctorName && formik.errors.doctorName}
                  label='Veterinario'
                  className={classes.textField}
                  variant='outlined'
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId='clients'>
                <TextField
                  fullWidth
                  select
                  id='ser'
                  name='user'
                  variant='outlined'
                  label='Cuidador'
                  value={formik.values.user}
                  className={classes.textField}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.user && Boolean(formik.errors.user)}
                  helperText={formik.touched.user && formik.errors.user}
                  defaultValue=''
                >
                  <MenuItem value=''>-- Nenhum --</MenuItem>
                  {clients.map(client => (
                    <MenuItem key={client.id} value={client}>{client.name}</MenuItem>
                  ))
                  }
                </TextField>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <fieldset style={{ marginLeft: '20px' }}>
                <Form.Group as={Row} controlId='sex'>
                  <Form.Label as='legend' column sm={4}>
                    Sexo
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Check
                      type='radio'
                      name='sex'
                      label='Masculino'
                      value='Masculino'
                      checked={formik.values.sex === 'Masculino'}
                      onChange={formik.handleChange}
                    />

                    <Form.Check
                      type='radio'
                      label='Feminino'
                      name='sex'
                      value='Feminino'
                      checked={formik.values.sex === 'Feminino'}
                      onChange={formik.handleChange}
                    />
                  </Col>
                  <Form.Control.Feedback type='invalid' tooltip>
                    {formik.errors.sex}
                  </Form.Control.Feedback>
                </Form.Group>
              </fieldset>

              {/* <Form.Group as={Col} controlId='birthday'>
                <Form.Date
                  type='date'
                  name='birthday'
                  label='Data de Nascimento'
                  variant='outlined'
                  value={formik.values.birthday}
                  defaultValue={new Date()}
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
               <Form.Group as={Col} controlId='color'>
                <TextField
                  fullWidth
                  select
                  id='color'
                  name='color'
                  variant='outlined'
                  label='Cor do Pet'
                  value={formik.values.color}
                  className={classes.textField}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.color && Boolean(formik.errors.color)}
                  helperText={formik.touched.color && formik.errors.color}
                  defaultValue=''
                >
                  <MenuItem value=''>-- Nenhum --</MenuItem>
                  {cores.map(cor => (
                    <MenuItem key={cor.id} value={cor.cor}>{cor.cor}</MenuItem>
                  ))
                  }
                </TextField>
              </Form.Group> 

             <Form.Group as={Col} controlId='formGridEmail'>
                <TextField
                  id='raca'
                  name='raca'
                  value={formik.values.raca}
                  onChange={formik.handleChange}
                  error={formik.touched.raca && Boolean(formik.errors.raca)}
                  helperText={formik.touched.raca && formik.errors.raca}
                  label='Raça'
                  className={classes.textField}
                  variant='outlined'
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId='id-description'>
                <TextField
                  fullWidth
                  multiline
                  variant='outlined'
                  rows={4}
                  className={classes.textField}
                  name='recommendations'
                  label='Recomendações'
                  value={formik.values.recommendations}
                  onChange={formik.handleChange}
                  error={formik.touched.raca && Boolean(formik.errors.raca)}
                  helperText={formik.touched.raca && formik.errors.raca}
                />
              </Form.Group>
            </Form.Row>  */}
            <Button type='submit' disabled={formik.isSubmitting}>
              {formik.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
              {(edit && 'Editar Pet') || 'Cadastrar'}
            </Button>
          </Form>

        </Modal.Body>
      </Modal>
      <Typography variant='h4' style={style}>Controle de Pacotes</Typography>
      <hr />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='right'>Nome</TableCell>

            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableCell align='right' ></TableCell>
          {/* {pets.map(pet => (
            <TableRow key={pet.id}>
              <TableCell style={{textAlign: "left"}} align='right'>{pet.name}</TableCell>
              <TableCell align='right'>{pet.doctorName}</TableCell>
              <TableCell align='right'>{pet.sex}</TableCell>
              <TableCell align='right'>{formatDate(pet.birthday)}</TableCell>
              <TableCell align='right'>{pet.color}</TableCell>
              <TableCell align='right'>{pet.raca}</TableCell>
              <TableCell align='right' >
                {pet.recommendations.map(rec => (
                  <span key={rec.id}> {rec.name} </span>
                ))}
              </TableCell>
              <TableCell align='right' >
                <CreateIcon onClick={() => handleChangeUpdate(pet)} />
                <DeleteIcon style={{ margin: '10px 10px 0 15px' }} onClick={() => deletePets(pet.id)} />
              </TableCell>

            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </Container >
  );
};

const style = {
  display: 'flex',
  justifyContent: 'center'
}

export default Pets;