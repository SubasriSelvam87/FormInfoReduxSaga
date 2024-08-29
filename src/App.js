import "./App.css";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import React from "react";
import Form from "./Pages/Form";
import Table from "./Pages/Table";
import "bootstrap/dist/css/bootstrap.css";
import Loading from "./Loading/Loading";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer/>
        <Routes>
          <Route path="/" element={<Navigate to="/form" />} />
          <Route element={<Form />} path="/form" />
          <Route element={<Form />} path="/form:id" />
          <Route element={<Table />} path="/table" />
          <Route element={<Loading/>} path="/loading"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
