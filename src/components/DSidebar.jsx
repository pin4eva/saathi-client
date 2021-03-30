import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const DSidebarComp = () => {
  return (
    <Aside className="dashboard-aside">
      <div className="aside-wrapper">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link">
              <i className="fas fa-home"></i>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard/todos" className="nav-link">
              <i className="fas fa-folder"></i>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link">
              <i className="fas fa-cog"></i>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link">
              <i className="fas fa-trash"></i>
            </NavLink>
          </li>
        </ul>
        <div className="bottom-nav">
          <NavLink to="/dashboard" className="nav-link ">
            <i className="fas fa-comments"></i>
          </NavLink>
        </div>
      </div>
    </Aside>
  );
};

export default DSidebarComp;

const Aside = styled.aside``;
