import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from 'axios'
import { PageArea } from "./styled";

import Input from "../../components/Input"
import {Form} from "@unform/web"

import { PageContainer } from "../../components/MainComponets";

function Page() {
  
  const submitHandler = (e) => {
    e.preventDefault()
    console.log(e)

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
  }

  return (
    <PageContainer>
      <PageArea>
        <Form onSubmit={submitHandler}>
          <label className="area">
            <div className="area--title">Nome Completo:</div>
            <div className="area--input">
              <Input type="text" name="user"/>
            </div>
          </label>
          <label className="area">
            <div className="area--title">E-mail:</div>
            <div className="area--input">
              <Input type="email" name="email" required />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Telefone:</div>
            <div className="area--input">
              <Input type="phone" name="phone" required />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Senha:</div>
            <div className="area--input">
              <Input type="password" name="key_password" required />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button type="submit">Fazer Cadastro</button>
            </div>
          </label>
        </Form>
      </PageArea>
    </PageContainer>
  );
}

export default Page;

Page.propTypes = {
  user: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  key_password: PropTypes.string,
  phone: PropTypes.string.isRequired
};



