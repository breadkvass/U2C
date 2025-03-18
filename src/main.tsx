import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ModalContextProvider } from "./hooks/useModal/useModalProvider";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModalContextProvider>
      <App />
    </ModalContextProvider>
  </React.StrictMode>
);