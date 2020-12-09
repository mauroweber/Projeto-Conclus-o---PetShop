import React, { useCallback } from "react";
import { useLocation } from "react-router-dom";
import dog from "../../assets/dog.png";

import { Navbar, Nav } from "react-bootstrap";

import { useAuth } from "../../../hooks/auth";
import {
  FaHome,
  FaUserPlus,
  FaPlusSquare,
  FaPaw,
  FaTruck,
  FaSignOutAlt,
  FaCalendarCheck,
} from "react-icons/fa";
import "./style.css";

const Header = () => {
  const { signOut, token } = useAuth();
  const locatinPath = useLocation().pathname;

  const handleLogout = useCallback(async () => {
    await signOut();
  }, [signOut]);

  return (
    <Navbar style={{ background: "#E67E22" }} expand="lg">
      <Navbar.Brand href="#home">
        <img style={{ height: 48 }} src={dog} alt="PetsCare" />
      </Navbar.Brand>
      <h3>Pet's Care</h3>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {token ? (
          <Nav className="ml-auto">
            <Nav.Link id="menu-link" href="/dashboard">
              <FaHome style={{ marginRight: 5 }} />
              Home
            </Nav.Link>
            <Nav.Link id="menu-link" href="/addClient">
              <FaUserPlus style={{ marginRight: 5 }} />
              Cadastro de Cliente
            </Nav.Link>
            <Nav.Link id="menu-link" href="/addproduct">
              <FaPlusSquare style={{ marginRight: 5 }} />
              Cadastro de Produto
            </Nav.Link>
            <Nav.Link id="menu-link" href="/pets">
              <FaPaw style={{ marginRight: 5 }} />
              Pets
            </Nav.Link>
            <Nav.Link id="menu-link" href="/supplier">
              <FaTruck style={{ marginRight: 5 }} />
              Fornecedor
            </Nav.Link>
            {/* <Nav.Link id="menu-link" href="/pacotes">
              <FaCalendarCheck style={{ marginRight: 5 }} />
              Controle de Pacotes
            </Nav.Link> */}
            <Nav.Link id="menu-link" onClick={handleLogout}>
              <FaSignOutAlt style={{ marginRight: 5 }} />
              Sair
            </Nav.Link>
            <Nav.Link href="/addClient"></Nav.Link>
          </Nav>
        ) : (
          locatinPath !== "/signin"
        )}
      </Navbar.Collapse>
    </Navbar>

    // <HeaderArea>
    //   <Container>

    //     <Link to="/">
    //       <img src={dog} alt="PetsHome" />
    //     </Link>

    //     <div className="Menu">
    //       <nav>
    //         {!token && locatinPath !== "/signin" ? (
    //           <ul>
    //             <li>
    //               <Link to="/signin">Login</Link>
    //             </li>
    //           </ul>

    //         ) : token ? (
    //           <ul>
    //             <li>
    //               <Link to="/addClient">Minha Conta</Link>
    //             </li>
    //             <li>
    //               <button onClick={handleLogout}>
    //                 <FiLogOut size={24} />
    //               </button>
    //             </li>
    //           </ul>

    //         ) : (null)}

    //       </nav>
    //     </div>
    //   </Container>
    // </HeaderArea>
  );
};

export default Header;
