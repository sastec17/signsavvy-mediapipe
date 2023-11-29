// Welcome / Login screen
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = (props) => {
  const { updateLoginStatus } = props; // Destructuring the function from props
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = () => {
    if (username == "") {
      alert("Enter a username");
    } else if (password === "") {
      alert("Enter a password");
    } else {
      try {
        const details = Cookies.get(username);
        if (details == null) {
          alert("User does not exist");
        }
        const json = JSON.parse(details);
        const temp = json.password;
        if (temp !== password) {
          alert("Invalid password");
        } else {
          Cookies.set("login", username);
          updateLoginStatus(true); // Update login status
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onButtonCreate = () => {
    navigate("/create-account");
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={username}
          placeholder="Enter your username here"
          onChange={(ev) => setUsername(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{usernameError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          type="password"
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Log in"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonCreate}
          value={"Create new account"}
        />
      </div>
    </div>
  );
};

export default Login;
