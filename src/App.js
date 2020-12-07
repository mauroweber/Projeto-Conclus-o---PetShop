import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/partials/Header";
import Routes from "./Route";
import AppProvider from "./hooks";
import Aside from "./components/partials/Aside";
import GlobalStyle, { PageBody } from "./styles/global";

//import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Header />
        <PageBody>
          <Routes />
        </PageBody>
      </AppProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
