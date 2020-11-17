import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from 'axios'
import { PageArea } from "./styled";

import { PageContainer } from "../../components/MainComponets";

function Page() {

  const [user, setEditableUser] = useState('');
  const [email, setEditableEmail] = useState('');
  const [key_password, setEditablePassword] = useState('');
  const [phone, setEditablePhone] = useState('');
  
  const submitHandler = (e) => {
    e.preventDefault()

    let parameter = {
      name: user,
      email: email,
      phone: phone,
      key_password: key_password
    }
    axios.post('http://localhost:8080/user/', parameter)
      .then(response => {
        debugger
        console.log(response)
        console.log(parameter)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <PageContainer>
      <PageArea>
        <form onSubmit={submitHandler}>
          <label className="area">
            <div className="area--title">Nome Completo:</div>
            <div className="area--input">
              <input type="text" name="user" value={user} onChange={setEditableUser} required />
            </div>
          </label>
          <label className="area">
            <div className="area--title">E-mail:</div>
            <div className="area--input">
              <input type="email" name="email" value={email} onChange={(e) => setEditableEmail(e.target.value)} required />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Telefone:</div>
            <div className="area--input">
              <input type="phone" name="phone" value={phone} onChange={(e) => setEditablePhone(e.target.value)} required />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Senha:</div>
            <div className="area--input">
              <input type="password" name="key_password" value={key_password} onChange={(e) => setEditablePassword(e.target.value)} required />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button type="submit">Fazer Cadastro</button>
            </div>
          </label>
        </form>
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



