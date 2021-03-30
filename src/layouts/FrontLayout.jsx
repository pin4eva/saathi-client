import React from "react";
import styled from "styled-components";
import FooterComp from "../components/FooterComp";
import HeaderComp from "../components/HeaderComp";

const FrontLayout = ({ children }) => {
  return (
    <Wrapper>
      <HeaderComp />
      <div className="main">{children}</div>
      <FooterComp />
    </Wrapper>
  );
};

export default FrontLayout;

const Wrapper = styled.div`
  /* background-color: red; */
  height: 100%;
  min-height: 100vh;

  display: grid;
  grid-template-rows: auto 1fr auto;
`;
