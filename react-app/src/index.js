import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import { ModalProvider } from "./context/Modal";
import { SignUpFormModalProvider } from "./context/SignUpFormModal";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <SignUpFormModalProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </SignUpFormModalProvider>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
