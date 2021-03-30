import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { SIGNUP, GOOGLE_SIGNUP } from "../apollo/queries/UserQuery";
import OTPComp from "./OTP";
import { GoogleLogin } from "react-google-login";
import jscookie from "js-cookie";
import { useSetRecoilState } from "recoil";
import { USER_ATOM } from "../atoms/userAtom";

const RegisterComp = () => {
  const [signup, { loading }] = useMutation(SIGNUP);
  const [google] = useMutation(GOOGLE_SIGNUP);
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const setUser = useSetRecoilState(USER_ATOM);
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const { password2, ...rest } = info;
    if (password2 !== rest.password) return alert("Passwords do not match");
    try {
      const { data } = await signup({ variables: { input: rest } });
      if (data) {
        setName(rest.name);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onGoogleSuccess = async (res) => {
    const { profileObj } = res;
    const payload = {
      email: profileObj.email,
      googleId: profileObj.googleId,
      // image: profileObj.imageUrl,
      name: profileObj.name,
    };
    try {
      const { data } = await google({ variables: { input: payload } });
      const { token, ...rest } = data.googleSignup;
      jscookie.set(token);
      setUser(rest);
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);

      if (error.graphQLErrors && error.graphQLErrors[0]) {
        alert(error.graphQLErrors[0].message);
      }
    }
  };

  return (
    <Wrapper className="">
      {success ? (
        <OTPComp name={name} />
      ) : (
        <div className="wrapper">
          <div className="intro">
            <h5 className="font-weight-bold">
              Welcome to <br /> Saathi ToDo App
            </h5>
            <p className="font-smaller text-muted">
              SIgn up an account by filling the form bellow.
            </p>
          </div>
          <form className="mt-3" onSubmit={submit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
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
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={handleChange}
              />
            </div>

            <div className="form-group ">
              <div className="d-flex align-items-baseline mt-4">
                <input type="checkbox" name="" id="" required />
                <p className="m-0 ml-4">
                  By clicking sign up, you hereby are in agreement with our{" "}
                  <b>Terms & Conditions and Disclaimer</b>{" "}
                </p>
              </div>
            </div>

            <div className="mt-2">
              <button className="btn btn-block text-center btn-primary">
                {loading ? "Loading..." : "SIGN UP"}
              </button>
            </div>
            <p className="mt-2  text-center">
              Already have an account ?
              <NavLink to="/login" className="c-hand">
                Login
              </NavLink>
            </p>
          </form>
          <div className="mt-2 text-center">
            <small>
              Or <br /> Sign in with
            </small>

            <div className="d-flex justify-content-center mt-2">
              {/* <img src="/images/facebook-circle.svg" alt="" className="mx-3" /> */}
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={(render) => (
                  <button className="p-0" onClick={render.onClick}>
                    <img
                      src="/images/google-circle.svg"
                      alt=""
                      // className="mx-3"
                    />
                  </button>
                )}
                onSuccess={onGoogleSuccess}
                onFailure={(er) => console.log(er)}
              />
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default RegisterComp;

const Wrapper = styled.div`
  height: inherit;
  .content {
 
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
