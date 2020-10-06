const { default: Api } = require("../../helpers/Api");
import React, { Component } from 'react';
import { PageArea } from "../SignIn/styled";
import { PageContainer} from "../../components/MainComponets";

class SignIn extends Component {
    render() {
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
    }
}

export default SignIn;