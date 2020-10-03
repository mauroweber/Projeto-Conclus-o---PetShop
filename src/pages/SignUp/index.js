import React, { useState } from "react";
import { PageArea } from "./styled";

import { PageContainer } from "../../components/MainComponets";

const Page = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <PageContainer>
      <PageArea>
        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">Nome Completo:</div>
            <div className="area--input">
              <input type="text" />
            </div>
          </label>
          <label className="area">
            <div className="area--title">E-mail:</div>
            <div className="area--input">
              <input type="email" />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Senha:</div>
            <div className="area--input">
              <input type="password" />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button>Fazer Cadastro</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
