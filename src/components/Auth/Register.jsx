import React from "react";
import reginsterImage from "../../asset/images/register.svg";
import "./Auth.scss";
import { Link } from "react-router-dom";
const Register = () => {
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
              <form action="">
                <div className="input-field">
                  <input type="text" placeholder="First Name" />
                </div>
                <div className="input-field">
                  <input type="text" placeholder="Last Name" />
                </div>
                <div className="input-field">
                  <input type="text" placeholder="Email" />
                </div>
                <div className="input-field">
                  <select name="gender" id="">
                    <option>Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">female</option>
                  </select>
                </div>
                <div className="input-field">
                  <input type="text" placeholder="Password" />
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
