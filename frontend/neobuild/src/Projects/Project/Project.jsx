import React from "react";
import "./Project.css";
import { Language } from "../../components/Language/Language";
import githubIcon from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";

export const Project = ({ id }) => {
  return (
    <article className="project">
      <header>
        <h3>Name Project</h3>
        <p>07/09/24</p>
      </header>
      <main>
        <div className="languages">
          <Language name="JavaScript" tag={true} />
          <Language name="TypeScript" tag={true} />
          <Language name="Python" tag={true} />
        </div>
        <p className="description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae
          eius, officiis et tempora, nostrum nulla asperiores vero consequuntur
          facilis alias...
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae
          eius, officiis et tempora, nostrum nulla asperiores vero consequuntur
          facilis alias...
        </p>
      </main>
      <footer>
        <p>
          <span>Keys: </span>CRM, Sales
        </p>
        <Link to="https://github.com/AarMagic" target="_blank">
          {" "}
          <img className="icon" src={githubIcon} alt="Github White Icon" />
        </Link>
      </footer>
    </article>
  );
};
