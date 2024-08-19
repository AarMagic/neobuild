import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const search = (e) => {
    try {
      e.preventDefault();
      const text = e.target.search.value;
      if (!text) {
        throw new Error("You must write a text");
      }
      const url = "/search/" + text;
      navigate(url);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header className="header">
      <Link to="/">
        <h1>
          <span>Neo</span>Build
        </h1>
      </Link>
      <Link className="button" to="/login">
        Login
      </Link>
      <form className="search" onSubmit={search}>
        <input type="search" name="search" placeholder="Search..." />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};
