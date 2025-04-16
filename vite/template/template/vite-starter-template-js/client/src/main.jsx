import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import "@app/_styles/style.css";
import "@assets/fonts/noir-pro/styles.css";
import App from "@app/App";
import { GoogleOAuthProvider } from "@react-oauth/google"; 

const GOOGLE_CLIENT_ID = "501374548581-46dloq477s005t1kolfjhtlduqlci4ki.apps.googleusercontent.com"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>,
  </React.StrictMode>
);
