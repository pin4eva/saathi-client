import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const DHeaderComp = () => {
  return (
    <Header>
      <nav className="navbar container">
        <NavLink to="/dashboard" className="nav-brand">
          <img src="/images/logo.svg" alt="" />
        </NavLink>

        <div className="form-custom">
          <i className="fas fa-search mr-3"></i>
          <input type="search" placeholder="Search..." />
        </div>

        <div className="dp">
          <img src="/images/letter-k.png" alt="" />
        </div>
      </nav>
    </Header>
  );
};

export default DHeaderComp;

const Header = styled.header`
  .dp {
    img {
      width: 100%;
      max-width: 3rem;
    }
  }
  .form-custom {
    background-color: #eceff1;
    padding: 0.4rem 1rem;
    border-radius: 10px;

    input {
      background-color: inherit;
    }
  }
`;
