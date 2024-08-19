import React, { useState } from "react";
import { Project } from "./Project/Project";
import './Projects.css'

export const Projects = () => {
  const [projects, setProjects] = useState([]);

  return (
    <section className="projects-container">
      <h2>Projects</h2>
      <div className="projects">
        <Project />
        <Project />
        <Project />
      </div>
    </section>
  );
};
