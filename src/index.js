import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FetchDataProvider } from "./store/fetch-context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <FetchDataProvider>
    <App />
  </FetchDataProvider>
);
