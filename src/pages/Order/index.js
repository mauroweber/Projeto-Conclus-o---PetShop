import React from 'react'
import { PageArea } from "./styled";
import { PageContainer } from "../../components/MainComponets";

function Page() {
  const now = new Date;
  const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  const leadingZero = (num) => `0${num}`.slice(-2);

  const formatTime = (date) => {
    [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map(leadingZero)
    .join(':')
  }

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
                  <label className="nOrder"></label>
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
              </div>
            </form>
          </div>
        </PageArea>
     </PageContainer>
   </div> 
  )
}

export default Page;