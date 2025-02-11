import React from "react";
import ReactDOM from "react-dom";

/* REDUX */
import { Provider } from "react-redux";
import store from "./store";
import { GoogleOAuthProvider } from '@react-oauth/google'; 

/* COMPONENTS */
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/* STYLING */
import "./index.css";
import "./bootstrap.min.css";

const googleClientId = '845512665517-sqrndab2vlttb0o4lba1nivu6civ38h4.apps.googleusercontent.com'; 

ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={googleClientId}> {/* Wrap with GoogleOAuthProvider */}
      <App />
    </GoogleOAuthProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
