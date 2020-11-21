import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { HeaderArea } from "./styled";

import { isLogged, doLogout } from "../../../helpers/AuthHandler";
import { useAuth } from "../../../helpers/AuthContext";

const Header = () => {
  const {signOut, date} = useAuth();
  const handleLogout =useCallback(async () => {
    await signOut();
  }, [signOut]);

  return (
    <HeaderArea>
      <div className="container">
        <div className="logo">
          <Link to="/">Logo Aqui</Link>
        </div>
        <div className="Menu">
          <nav>
            <ul>
              {!date ?(
                <>
                  <li>
                    <Link to="/signin">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Cadastrar</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/addClient">Minha Conta</Link>
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
