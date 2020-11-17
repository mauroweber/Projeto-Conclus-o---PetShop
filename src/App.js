import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Template } from "./components/MainComponets";
import Header from "./components/partials/Header";
import Routes from "./Route";
//import Footer from "./components/partials/Footer";
//import Aside from "./components/partials/Aside";
import GlobalStyle from "./styles/global"

//import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Template>
        <Header />
        <Routes />
      </Template>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
