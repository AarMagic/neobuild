import React from "react";

export const Header = () => {
  return (
    <header className="header">
      <h1>
        <span>Neo</span>Build
      </h1>
      <form className="search">
        <input type="search" placeholder="Search..." />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};