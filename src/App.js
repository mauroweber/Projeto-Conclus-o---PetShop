import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Template } from "./components/MainComponets";
import Header from "./components/partials/Header";
import Routes from "./Route";
import { AuthProvider } from "./helpers/AuthContext";
//import Footer from "./components/partials/Footer";
//import Aside from "./components/partials/Aside";
import GlobalStyle from "./styles/global"

//import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Template>
        <AuthProvider>
          <Header />
          <Routes />
        </AuthProvider>
      </Template>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
