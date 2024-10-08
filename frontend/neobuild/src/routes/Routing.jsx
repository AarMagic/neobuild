import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Index } from "../components/pages/Index";
import { Login } from "../components/auth/Login";
import { Search } from "../components/pages/Search";
import { Create } from "../components/pages/Create";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/search/:text" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
};
