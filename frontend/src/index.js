import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GlobalStyle } from "./styles/GlobalStyle";
import { GlobalProvider } from "./context/GlobalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GlobalStyle />
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </>
);
