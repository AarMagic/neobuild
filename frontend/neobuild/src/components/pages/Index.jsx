import React, { useState } from "react";
import { Aside } from "../layout/Aside";
import { Projects } from "../../Projects/Projects";

export const Index = () => {
  return (
      <main className="content">
        <div className="principal">
          <Projects />
        </div>
        <Aside />
      </main>
  );
};
