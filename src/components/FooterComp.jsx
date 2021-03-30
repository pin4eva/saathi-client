import React from "react";

const FooterComp = () => {
  return (
    <footer className="container footer">
      <div className="d-flex">
        <ul className="footer-wrapper">
          <li>Terms & conditions | Privacy policy</li>
          <li>©2021 All right reserved</li>
          <li className="social">
            <ul className="nav">
              <li className="nav-item">Follow Us</li>
              <li className="nav-item">
                <img src="/images/twitter.svg" alt="" />
              </li>
              <li className="nav-item">
                <img src="/images/instagram.svg" alt="" />
              </li>
              <li className="nav-item">
                <img src="/images/facebook.svg" alt="" />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterComp;
