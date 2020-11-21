import React, { useState } from 'react'
import { PageArea } from "./styled";
import { PageContainer } from "../../components/MainComponets";

function Page() {
  const now = new Date;
  const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  const [ client, setClient ] = useState('');
  const [ prodID, setProdId ] = useState('');
  const [ cpf, setCpf ] = useState('');

  return(
   <div>
     <PageContainer>
        <PageArea>
          <div>
            <form>
                <h3>Dados do Pedido</h3>
              <div className="order"> 
                <div className="order--area"> 
                  <label>Número do Pedido:</label>
                  <label className="nOrder">.</label>
                </div>
                <div className="order--area">
                  <label>Data: </label>
                  <label>{now.getDate() + " / " + month[now.getMonth()] + " / " + now.getFullYear()}</label>
                </div>
                <div className="order--area">
                  <label>Hora: </label>
                  <label>{now.getHours() + " : " +now.getMinutes()}</label>
                </div>
              </div>
                <div className="client">
                  <label>CPF:</label>
                  <input value={cpf}></input>
                  <label>Nome: </label>
                  <label>{client}</label>
                  
                </div>
                <div className="order-table-area">
                  <table>
                    <thead>
                      <td>Cód. Item</td>
                      <td>Descrição</td>
                      <td>UN</td>
                      <td>QTDE</td>
                      <td>Valor unitário</td>
                      <td>Valor Total</td>
                    </thead>
                    <tbody>
                      <td>
                        <input type="text" value={prodID}></input>
                      </td>
                    </tbody>
                  </table>
                </div>
                <button className="terminateOrder">Concluir Ordem</button>
            </form>
          </div>
        </PageArea>
     </PageContainer>
   </div> 
  )
}

export default Page;