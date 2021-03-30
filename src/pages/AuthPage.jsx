import React, { useState } from "react";
import LoginComp from "../components/Login";
import RegisterComp from "../components/Register";

const AuthPage = () => {
  const [view, setView] = useState(true);
  return (
    <div>
      {view ? (
        <LoginComp setView={() => setView(false)} />
      ) : (
        <RegisterComp setView={() => setView(true)} />
      )}
    </div>
  );
};

export default AuthPage;
