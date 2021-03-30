import React from "react";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home bg-gray">
      <div className="container">
        <div className="banner">
          <div className="text-content">
            <div className="wrapper">
              <h1 className="display-1">
                The <span className="text-primary ">#1</span> ToDo <br />
                Software
              </h1>

              <p className="my-5 show-case text-18">
                <span className="text-primary">Saathi ToDo App </span> helps
                scheduling of task and makes keeping track of your activities
                easier!
              </p>

              <div className="button">
                <NavLink to="/register" className="btn btn-primary">
                  Get Started
                </NavLink>
              </div>
            </div>
          </div>

          <div className="image">
            <img src="/images/banner.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
