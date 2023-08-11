import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles.css';
import App from './App';
import ChangePassword from "./ChangePassword";
import ChangeDone from "./ChangeDone";
import PasswordReset from "./PasswordReset";
import ResetDone from "./ResetDone";
import VerificationSuccess from './VerificationSuccess';
import Dashboard from './Dashboard.js';

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>

<Routes>
<Route element={<ChangePassword/>}path="/ChangePassword"></Route>
<Route element={<ChangeDone/>}path="/ChangeDone"></Route>
<Route element={<PasswordReset/>}path="/PasswordReset"></Route>
<Route element={<ResetDone/>}path="/ResetDone"></Route>
<Route element={<VerificationSuccess/>}path="/VerificationSuccess"></Route>
<Route element={<Dashboard/>}path="/dashboard"></Route>
<Route path="/*" element={<App />} />
</Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);


