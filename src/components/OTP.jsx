import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { VERIFY_TOKEN } from "../apollo/queries/UserQuery";
import { USER_ATOM } from "../atoms/userAtom";
import jscookie from "js-cookie";
import { TOKEN_NAME } from "../apollo";

const OTPComp = ({ name }) => {
  const [otp, setOtp] = useState("");
  const [verify, { loading }] = useMutation(VERIFY_TOKEN);
  const setUser = useSetRecoilState(USER_ATOM);
  const submit = async (e) => {
    e.preventDefault();
    if (!otp) return;

    try {
      const { data } = await verify({ variables: { otp } });
      console.log(data);
      const { token, ...rest } = data.verifyToken;
      jscookie.set(TOKEN_NAME, token);
      setUser(rest);
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="wrapper">
        <div className="intro">
          <h5 className="font-weight-bold">Hey, {name}</h5>
          <p className="font-smaller text-muted m-0">
            Check your email for the OTP
          </p>
        </div>
        <form className="mt-3" onSubmit={submit}>
          <div className="form-group">
            <label>Enter OTP Code</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <div className="mt-5">
            <button className="btn btn-block text-center btn-primary">
              {loading ? "Processung..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default OTPComp;
