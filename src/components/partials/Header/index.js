import React from "react";
import { Link } from "react-router-dom";
import { HeaderArea } from "./styled";

import { isLogged, doLogout } from "../../../helpers/AuthHandler";

const Header = () => {
  let logged = isLogged(); //Verifica se o usuário está logado para habilitar os menus

  const handleLogout = () => {
    doLogout();
    window.location.href = "/";
  };

  return (
    <HeaderArea>
      <div className="container">
        <div className="logo">
          <Link to="/">Logo Aqui</Link>
        </div>
        <div className="Menu">
          <nav>
            <ul>
              {!logged && (
                <>
                  <li>
                    <Link to="/signin">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Cadastrar</Link>
                  </li>
                </>
              )}
              {logged && (
                <>
                  <li>
                    <Link to="/my-account">Minha Conta</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Sair</button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </HeaderArea>
  );
};

export default Header;
