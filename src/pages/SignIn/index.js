import React, { useState } from "react";
import { PageArea } from "./styled";
import useApi from "../../helpers/PetshopApi";
import { doLogin } from "../../helpers/AuthHandler";

import { PageContainer, ErrorMessage } from "../../components/MainComponets";

const Page = () => {
  const api = useApi();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remenberPassword, setRemenberPassword] = useState("");
  const [disabled, setDisabled] = useState(false); //desabilita os do login quando apertar no botão
  const [error, setError] = useState(""); //capturar o erro do login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);

    const json = await api.login(email, password);

    if (json.error) {
      setError(json.error);
    } else {
      doLogin(json.token, remenberPassword);
      window.location.href = "/";
    }
  };

  return (
    <PageContainer>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">E-mail:</div>
            <div className="area--input">
              <input
                type="email"
                disabled={disabled}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Senha:</div>
            <div className="area--input">
              <input
                type="password"
                disabled={disabled}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Lembrar Senha:</div>
            <div className="area--input">
              <input
                type="checkbox"
                disabled={disabled}
                checked={remenberPassword}
                onChange={() => setRemenberPassword(!remenberPassword)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disabled}>Fazer Login</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
