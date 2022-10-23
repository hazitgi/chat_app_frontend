import React, { useState } from "react";
import loginImage from "../../asset/images/login.svg";
import "./Auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/Actions/auth";
// import AuthService from "../../services/Auth";
import { useDispatch } from "react-redux";

const Login = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    console.log(email, password);
    // AuthService.login({ email, password }).then((result) => {
    //   console.log(result);
    // });
    dispatch(login({ email, password },navigate));
    console.log(dispatch);
  };
  return (
    <div>
      <div id="auth-container">
        <div id="auth-card">
          <div>
            <div id="image-section">
              <img src={loginImage} alt="loign" />
            </div>
            <div id="form-section">
              <h2>Welcome back</h2>
              <form onSubmit={submitForm}>
                <div className="input-field">
                  <input
                    value={email}
                    required="required"
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    required="required"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button>Login</button>
              </form>

              <p>
                Don't have an account? <Link to="/register">Register</Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
