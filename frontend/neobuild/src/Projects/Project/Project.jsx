import React, { useEffect, useState } from "react";
import "./Project.css";
import { Language } from "../../components/Languages/Language/Language";
import githubIcon from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";
import { FetchData } from "../../helpers/FetchData";

export const Project = ({ id }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    const url = "http://localhost:3900/api/project/" + id;
    const request = await FetchData(url);
    if (request.status === "success") {
      setData(request.project);
    }
  };

  const getDate = (getDate) => {
    let date = getDate;
    const dateForrmated = new Date(date).toLocaleDateString("es-ES");
    return dateForrmated;
  };

  return (
    <article className="project">
      {data && (
        <>
          <header>
            <h3>{data.title}</h3>
            <p>{getDate(data.date)}</p>
          </header>
          <main>
            <div className="languages">
              {Array.isArray(data.technologies) &&
                data.technologies.map((technology, index) => {
                  return <Language key={index} name={technology} tag={true} />;
                })}
            </div>
            <p className="description">{data.content}</p>
          </main>
          <footer>
            <p>
              <span>Keys: </span>
              {Array.isArray(data.keys) && data.keys.length > 0 ? data.keys.join(", ") : "none"}
            </p>
            {Array.isArray(data.repositories) &&
              data.repositories.length > 0 && (
                <Link to={data.repositories} target="_blank">
                  <img
                    className="icon"
                    src={githubIcon}
                    alt="Github White Icon"
                  />
                </Link>
              )}
          </footer>
        </>
      )}
    </article>
  );
};
