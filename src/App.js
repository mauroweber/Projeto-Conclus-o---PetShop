import React from "react";
import { BrowserRouter } from "react-router-dom";

import { Template } from "./components/MainComponets";
import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import Aside from "./components/partials/Aside";

import Routes from "./Routes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Template>
        <Header />
        <Routes />
      </Template>
    </BrowserRouter>
  );
}

export default App;
