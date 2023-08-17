import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Register from "./components/Register";
import Home from "./Home";
const AppRouter = () => {
  return (
    <Routes>
      <Routes>
        <Route index path="/login" element={<LoginForm/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Routes>
  );
};

export default AppRouter;