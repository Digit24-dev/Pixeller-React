import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GLogin from "./GLogin";
import "../static/css/ModalLogin.css";
import { UserDTO } from "../api/dto/user.js";
import { loginS } from "../api/login.jsx";

const ModalLogin = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const user = new UserDTO(username, password);

    const res = await loginS(user);
    if (res === "success") {
      navigate("/main");
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modal-wrapper">
        <div className="modal">
          <div className="body">
            <form className="form-login">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
              ></input>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              ></input>
              <div className="login-google">
                <GLogin />
              </div>
            </form>
          </div>
          <div className="footer">
            <button onClick={handleLogin}>Login</button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalLogin;
