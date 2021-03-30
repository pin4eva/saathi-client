import { useMutation } from "@apollo/client";
import jscookies from "js-cookie";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { TOKEN_NAME } from "../apollo";
import { GOOGLE_LOGIN, LOGIN } from "../apollo/queries/UserQuery";
import { USER_ATOM } from "../atoms/userAtom";
import OTPComp from "./OTP";
import { GoogleLogin } from "react-google-login";

const LoginComp = ({ setView }) => {
  const [name, setName] = useState("");
  const [otp, setOtp] = useState(false);
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const [login, { loading }] = useMutation(LOGIN);
  const setUser = useSetRecoilState(USER_ATOM);
  const [google] = useMutation(GOOGLE_LOGIN);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: info });
      const { token, ...rest } = data.login;
      if (rest.otp) {
        setName(rest.name);
        setOtp(true);
        return;
      }
      jscookies.set(TOKEN_NAME, token);
      setUser(rest);
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = async (res) => {
    const { googleId } = res.profileObj;
    if (!googleId) return alert("Failed to login");
    try {
      const { data } = await google({ variables: { googleId } });

      const { token, ...rest } = data.googleLogin;
      jscookies.set(TOKEN_NAME, token);
      setUser(rest);
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {otp ? (
        <OTPComp name={name} />
      ) : (
        <div className="wrapper">
          <div className="intro">
            <h5 className="font-weight-bold">Welcome Back</h5>
            <p className="font-smaller text-muted m-0">
              SIgn in to your account by filling the form bellow.
            </p>
          </div>
          <form className="mt-3" onSubmit={submit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
              />
            </div>

            <div className="mt-5">
              <button className="btn btn-block text-center btn-primary">
                {loading ? "Loading..." : " SIGN IN"}
              </button>
            </div>
            <p className="mt-3  text-center">
              Don't have an account yet ?{" "}
              <NavLink to="/register" className="c-hand" onClick={setView}>
                Sign Up
              </NavLink>
            </p>
          </form>
          <div className="mt-4 text-center">
            <small>
              Or <br /> Sign in with
            </small>

            <div className="d-flex justify-content-center mt-3">
              {/* <img src="/images/facebook-circle.svg" alt="" className="mx-3" /> */}
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={(render) => (
                  <button className="p-0" onClick={render.onClick}>
                    <img
                      src="/images/google-circle.svg"
                      alt=""
                      className="mx-3"
                    />
                  </button>
                )}
                onSuccess={googleLogin}
                onFailure={(er) => console.log(er)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginComp;

// const Wrapper = styled.div`
//   height: inherit;
//   .content {

//     height: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     .wrapper {
//       width: 100%;
//       max-width: 500px;
//       background-color: #fff;
//       padding: 2rem;
//         line-height: 1.625rem;
//       }
//     }
//   }
// `;
