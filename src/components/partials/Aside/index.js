import React from "react";
import { Link } from "react-router-dom"
import { AsideArea } from "./styled";
import { useAuth } from "../../../hooks/auth";

const Aside = () => {
  const {token} = useAuth();
  return (
    <>
      {!!token ?(
        <AsideArea>
          <ul>
            <li><Link to="/dashboard">Home</Link></li>
            <li><Link to="/addClient">Cadastro Cliente</Link></li>
            <li><Link to="/addproduct">Cadastro Produto</Link></li>
            <li><Link to="/pets">Pets </Link></li>
          </ul>
        </AsideArea>) : (null)}
    </>

  );

};

export default Aside;
