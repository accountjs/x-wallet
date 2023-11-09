import { Route, Routes, MemoryRouter, Navigate } from "react-router-dom";
import "../globals.css";
import { XWalletProvider } from "./context";

import App from "./App";

function IndexPopup() {
  return (
    <XWalletProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </XWalletProvider>
  );
}

export default IndexPopup;
