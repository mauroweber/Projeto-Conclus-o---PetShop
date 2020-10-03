import React from "react";
import { PageArea } from "./styled";

import { PageContainer } from "../../components/MainComponets";

const Page = () => {
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
              <input type="text" required></input>
              <label>Data de Nascimento:</label>
              <input type="date" required></input>
              <label>Sexo:</label>
              <select className="gender" id="gender">
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
              </select>
              <label>Telefone:</label>
              <input type="tel"></input>
              <label>Celular:</label>
              <input type="tel" required></input>
              <label>RG:</label>
              <input type="text" required></input>
              <label>CPF:</label>
              <input type="text" required></input>
              <label>E-mail:</label>
              <input type="email" required></input>
            </div>
          </div>
          <p>Endereço</p>
          {/* Area de endereço do cliente*/}
          <hr />
          <div className="area">
            <label>Endereço:</label>
            <input type="text" required></input>
            <label>Número:</label>
            <input type="number" required></input>
            <label>Cidade:</label>
            <input type="text" required></input>
            <label>Estado:</label>
            <input type="text" required></input>
            <label>CEP:</label>
            <input type="search" required></input>
            <label>Complemento:</label>
            <input type="text" required></input>
          </div>
          <p>Dados do Pet</p>
          {/* Area de informações do pet do cliente*/}
          <hr />
          <div className="area">
            <label>Nome do Animal:</label>
            <input type="text" required></input>
            <label>Raça:</label>
            <input type="text" required></input>
            <label>Idade:</label>
            <input type="text" required></input>
            <label>Observação:</label>
            <input type="text"></input>
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
