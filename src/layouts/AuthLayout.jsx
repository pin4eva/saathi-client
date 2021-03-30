import React from "react";
import styled from "styled-components";
import HeaderComp from "../components/HeaderComp";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth">
      <HeaderComp hidden />
      <Wrapper className="main-wrapper">
        <div className="content">{children}</div>
      </Wrapper>
    </div>
  );
};

export default AuthLayout;

const Wrapper = styled.div`
  height: inherit;

  .content {

    /* display: flex;
    justify-content: center;
    align-items: center; */
    .wrapper {
      width: 100%;
      max-width: 500px;
      background-color: #fff;
      padding: 2rem;
        line-height: 1.625rem;
      }
    }
  }
`;
