import React, { useState } from "react";
import { PageArea } from "./styled";
import CepApi from '../../helpers/CepApi'

import { PageContainer } from "../../components/MainComponets";

CepApi.get('58035192/json').then(res => {
  console.log(res.data)
})
.catch(error => {
  console.log(error)
})

const cepHandler = (e) => { // função para preencher o CEP automatico
  
}

const Page = () => {

  const [ userName, setUserName] = useState('');
  const [ dateBorn, setDateBorn ] = useState('');
  const [ male, setMale ] = useState('');
  const [ female, setFemale ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ celPhone, setCelPhone ] = useState('');
  const [ rg, setRg ] = useState('');
  const [ cpf, setCpf ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ cep, setCep ] = useState('');
  const [ number, setNumber ] = useState('')
  const [ logradouro, setLogradouro ] = useState('');
  const [ localidade, setLocalidade ] = useState('');
  const [ uf, setUf ] = useState('');
  const [ complemento, setComplemento ] = useState('');
  const [ petName, setPetName ] = useState('');
  const [ petBreed, setPetBreed ] = useState('');
  const [ petAge, setPetAge ] = useState('');
  const [ petObservation, setPetObservation ] = useState('');

  return (
    <PageContainer>
      <PageArea>
        <form>
          <p>Dados Pessoais</p>
          {/* Area de dados pessoais do cliente*/}
          <hr />
          <div className="Container">
            <div className="personalArea">
              <label>Nome Completo:</label>
              <input type="text" required value={userName} onChange={(e)=> setUserName(e.target.value)}></input>
              <label>Data de Nascimento:</label>
              <input type="date" required value={dateBorn}></input>
              <label>Sexo:</label>
              <select className="gender" id="gender">
                <option value={male}>Masculino</option>
                <option value={female}>Feminino</option>
              </select>
              <label>Telefone:</label>
              <input type="tel" value={phone}></input>
              <label>Celular:</label>
              <input type="tel" value={celPhone} required></input>
              <label>RG:</label>
              <input type="text" value={rg} required></input>
              <label>CPF:</label>
              <input type="text" value={cpf} required></input>
              <label>E-mail:</label>
              <input type="email" value={email} required></input>
            </div>
          </div>
          <p>Endereço</p>
          {/* Area de endereço do cliente*/}
          <hr />
          <div className="area">
            <label>Endereço:</label>
            <label>CEP:</label>
            <input type="text" value={cep} onChange={cepHandler} required></input>
            <input type="text" value={logradouro} required></input>
            <label>Número:</label>
            <input type="number" value={number} required></input>
            <label>Cidade:</label>
            <input type="text" value={localidade} required></input>
            <label>Estado:</label>
            <input type="text" value={uf} required></input>
            <label>Complemento:</label>
            <input type="text" value={complemento} required></input>
          </div>
          <p>Dados do Pet</p>
          {/* Area de informações do pet do cliente*/}
          <hr />
          <div className="area">
            <label>Nome do Animal:</label>
            <input type="text" value={petName} required></input>
            <label>Raça:</label>
            <input type="text" value={petBreed} required></input>
            <label>Idade:</label>
            <input type="text" value={petAge} required></input>
            <label>Observação:</label>
            <input type="text" value={petObservation}></input>
          </div>
          {/*Botão para cadastro do cliente*/}
          <div className="btnAdd">
            <button>Cadastrar Cliente</button>
          </div>
        </form>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
