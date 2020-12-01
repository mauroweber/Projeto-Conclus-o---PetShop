import React from "react";
import { Link } from "react-router-dom";
import { AsideArea } from "./styled";
import { useAuth } from "../../../hooks/auth";

const Aside = () => {
  const { token } = useAuth();
  return (
    <>
      {!!token ? (
        <AsideArea>
          <ul>
            <li>
              <Link to="/dashboard">Home</Link>
            </li>
            <li>
              <Link to="/addClient">Cliente</Link>
            </li>
            <li>
              <Link to="/addproduct">Produto</Link>
            </li>
            <li>
              <Link to="/pets">Pets </Link>
            </li>
            <li>
              <Link to="/supplier">Fornecedor</Link>
            </li>
          </ul>
        </AsideArea>
      ) : null}
    </>
  );
};

export default Aside;
