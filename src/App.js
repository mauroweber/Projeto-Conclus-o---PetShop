import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/partials/Header";
import Routes from "./Route";
import AppProvider from "./hooks";
import Footer from "./components/partials/Footer";
import Aside from "./components/partials/Aside";
import GlobalStyle , {Test} from "./styles/global";


//import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Header />
        <Test>
          <Aside />
          <Routes />
        </Test>
        <Footer />
      </AppProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
