import React, { useContext, useEffect, useState } from "react";
import { Project } from "./Project/Project";
import "./Projects.css";
import { FetchData } from "../helpers/FetchData";
import { NumberPages } from "./NumberPages/NumberPages";
import { FilterContext, useFilterContext } from "../context/FilterContext";
import { useLanguageContext } from "../context/LanguagesContext";

export const Projects = ({ url }) => {
  const [data, setData] = useState({});
  const [urlState, setUrlState] = useState("");
  const [projects, setProjects] = useState([]);
  const [pages, setPages] = useState(0);
  let { page, setPageValue } = useFilterContext();
  let { language, setLanguageValue } = useLanguageContext();

  useEffect(() => {
    setPageValue(1);
    setLanguageValue("");
  }, []);

  useEffect(() => {
    if (data.status === "success") {
      let pages = 0;
      if (data.projects.totalPages) {
        pages = data.projects.totalPages;
      }
      if (pages > 0) {
        setPages(pages);
      } else {
        setPages("");
      }
      let projects = data.projects.docs;
      setProjects(projects);
    }
  }, [data]);

  useEffect(() => {
    if (!url || url.length < 0) {
      if (language !== "") {
        const url = "http://localhost:3900/api/projects/language/" + language;
        getProjects(url);
      } else {
        const url = "http://localhost:3900/api/projects/?page=" + page;
        getProjects(url);
      }
    } else {
      setUrlState(url);
    }
  }, [page, language, url]);

  useEffect(() => {
    getProjects(urlState);
  }, [urlState]);

  const getProjects = async (url) => {
    try {
      if (url) {
        const data = await FetchData(url);
        if (!data) {
          throw new Error("Error data");
        }
        setData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="projects-container">
      <h2>Projects</h2>
      <div className="projects">
        {Array.isArray(projects) &&
          projects.length > 0 &&
          projects.map((project, index) => (
            <Project key={index} id={project._id} />
          ))}
      </div>
      {pages > 0 ? <NumberPages number={pages} /> : ""}
    </section>
  );
};
