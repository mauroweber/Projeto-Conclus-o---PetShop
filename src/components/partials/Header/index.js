import React, { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { HeaderArea, Container } from "./styled";
import { FiLogOut } from "react-icons/fi";
import dog from "../../assets/dog.png"

import { useAuth } from "../../../hooks/auth";

const Header = () => {
  const { signOut, token } = useAuth();
  const locatinPath = useLocation().pathname;

  const handleLogout = useCallback(async () => {
    await signOut();
  }, [signOut]);

  return (
    <HeaderArea>
      <Container>

        <Link to="/">
          <img src={dog} alt="PetsHome" />
        </Link>

        <div className="Menu">
          <nav>
            {!token && locatinPath !== "/signin" ? (
              <ul>
                <li>
                  <Link to="/signin">Login</Link>
                </li>
              </ul>

            ) : token ? (
              <ul>
                <li>
                  <Link to="/addClient">Minha Conta</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>
                    <FiLogOut size={24} />
                  </button>
                </li>
              </ul>

            ) : (null)}

          </nav>
        </div>
      </Container>
    </HeaderArea>
  );
};

export default Header;
