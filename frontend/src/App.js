import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./pages/ProtectedRoute";
import { useGlobalContext } from "./context/GlobalContext";
// import {Dna} from 'react-loader-spinner'
import Loader from "./utils/Loader";
// import Homepage from './pages/HomePage'

const App = () => {
  const { isLoading } = useGlobalContext();

  return (
    <>
      {isLoading && <Loader />}
      <Toaster position="top-center" reverseOrder={false} />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
