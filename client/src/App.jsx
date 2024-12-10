import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/ Home";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CategoriesPage from "./pages/CategoriesPage";
import Leaderboard from "./pages/Leaderboard";
import RandomQzPage from "./pages/RandomQzPage";
import QzEnter from "./pages/QzEnter";


function App() {
  const token=localStorage.getItem("token")
  console.log(token)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/categories" element={<CategoriesPage/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
        <Route path="/RandomQzPage/:cat" element={<RandomQzPage/>}/>
        <Route path="/RandomQz-start/:cat" element={token?<QzEnter/>:<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
