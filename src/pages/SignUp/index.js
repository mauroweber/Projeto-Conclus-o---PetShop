import React, { useState } from "react";
import PropTypes from "prop-types";
import api from "../../helpers/Api";
import { PageArea } from "./styled";
import Yup from "yup";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Form } from "@unform/web";

import { PageContainer } from "../../components/MainComponets";
import { useCallback } from "react";

const Page = () => {

  const submitHandler = useCallback((data) => {
    data.preventDefault();

    /*let parameter = {
      name: user,
      email: email,
      phone: phone,
      key_password: key_password
    }
  /*  axios.post('http://localhost:8080/user/', parameter)
      .then(response => {
        debugger
        console.log(response)
        console.log(parameter)
      })
      .catch(error => {
        console.log(error)
      })*/
  }, []);

  return (
    <PageContainer>
      <PageArea>
        <Form onSubmit={submitHandler} >
          <div  layout="row" >
            <Input type="text" name="user" placeholder="Nome" />
            <Input type="email" name="email" placeholder="Email" required />
            <Input type="phone" name="phone" placeholder="Telefone" required />
            <Input type="password" name="key_password" placeholder="Senha" required />
          </div>
          <Button type="submit">Cadastrar</Button>
        </Form>
      </PageArea>
    </PageContainer>
  )
};

export default Page;

Page.propTypes = {
  user: PropTypes.string,
  email: PropTypes.string,
  key_password: PropTypes.string,
  phone: PropTypes.string
};



