import React, { useState } from "react";
import reginsterImage from "../../asset/images/register.svg";
import "./Auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../store/Actions/auth";
const Register = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    console.log(email, password);
    // AuthService.login({ email, password }).then((result) => {
    //   console.log(result);
    // });
    dispatch(
      register({ firstName, lastName, gender, email, password }, navigate)
    );
  };
  return (
    <div>
      <div id="auth-container">
        <div id="auth-card">
          <div>
            <div id="image-section">
              <img src={reginsterImage} alt="Register" />
            </div>
            <div id="form-section">
              <h2>Create an account</h2>
              <form action="" onSubmit={submitForm}>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    required="required"
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    required="required"
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    required="required"
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <select
                    name="gender"
                    id=""
                    value={gender}
                    required="required"
                    onChange={(e) => setgender(e.target.value)}
                  >
                    <option>Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">female</option>
                  </select>
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    required="required"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <button>Register</button>
              </form>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
