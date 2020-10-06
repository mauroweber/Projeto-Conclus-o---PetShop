import React, { Component } from "react";
import axios from 'axios'
import { PageArea } from "./styled";

import { PageContainer } from "../../components/MainComponets";

class Page extends Component {  

  constructor(props) {
    super(props)

    this.state = {
      user: '',
      email: '',
      key_password:'',
      phone: ''
    }
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  
 submitHandler = (e) => {
   e.preventDefault()
 
   let parameter = {
     name: this.state.user,
     email: this.state.email,
     phone: this.state.phone,
     key_password: this.state.key_password
   }
   axios.post('http://localhost:8080/user/', parameter)
   .then(response => {debugger
     console.log(response)
     console.log(parameter)
   })
   .catch(error => {
     console.log(error)
   })
 }
 
  render() {
    const { user, email, key_password, phone} = this.state
    return(
      <PageContainer>
        <PageArea>
          <form onSubmit={this.submitHandler}>
            <label className="area">
              <div className="area--title">Nome Completo:</div>
              <div className="area--input">
                <input type="text" name="user" value={user} onChange={this.changeHandler} required/>
              </div>
            </label>
            <label className="area">
              <div className="area--title">E-mail:</div>
              <div className="area--input">
                <input type="email" name="email" value={email} onChange={this.changeHandler} required/>
              </div>
            </label>
            <label className="area">
              <div className="area--title">Telefone:</div>
              <div className="area--input">
                <input type="phone" name="phone" value={phone} onChange={this.changeHandler} required/>
              </div>
            </label>
            <label className="area">
              <div className="area--title">Senha:</div>
              <div className="area--input">
                <input type="password" name="key_password" value={key_password} onChange={this.changeHandler} required/>
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
    )
  }
}

export default Page
