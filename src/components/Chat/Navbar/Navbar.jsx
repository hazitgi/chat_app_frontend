import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout, updateProfile } from "../../../store/Actions/auth";
import Modal from "../../Modal/Modal";

function Navbar() {
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const [showProfileOptions, setshowProfileOptions] = useState(false);
  const [showProfileModal, setshowProfileModal] = useState(false);
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [email, setemail] = useState(user.email);
  const [gender, setgender] = useState(user.gender);
  const [password, setpassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    const form = { firstName, lastName, email, gender, avatar };

    if (password.length > 0) form.password = password;

    const formData = new FormData();

    for (const key in form) {
      formData.append(key, form[key]);
    }

    dispatch(updateProfile(formData))
      .then((result) => {
        setshowProfileModal(false);
      })
      .catch((err) => {
        alert(err?.message);
      });
  };

  return (
    <div id="navbar" className="card-shadow">
      <h2>Chat.io</h2>

      <div
        id="profile-menu"
        onClick={() => {
          setshowProfileOptions(!showProfileOptions);
        }}
      >
        <img src={user.avatar} alt="avatar" height="40" width="40" />
        <p>
          {user.firstName} {user.lastName}
        </p>
        <FontAwesomeIcon icon="caret-down" className="fa-icon" />
        {showProfileOptions && (
          <div id="profile-options">
            <p onClick={() => setshowProfileModal(true)}>Update Profile</p>
            <p onClick={() => dispatch(logout())}>Logout</p>
          </div>
        )}
        {showProfileModal && (
          <Modal click={() => setshowProfileModal(false)}>
            <Fragment key="header">
              <h3 className="m-0">Update Profile</h3>
            </Fragment>
            <Fragment key="body">
              <form>
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
                <div className="input-field">
                  <input
                    type="file"
                    placeholder="Profile avatar"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                </div>
              </form>
            </Fragment>
            <Fragment key="footer">
              <button className="btn-success" onClick={submitForm}>
                Register
              </button>
            </Fragment>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Navbar;
