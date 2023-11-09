// Create Account
// Welcome / Login screen
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Create = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");

  const navigate = useNavigate();

  const onButtonClick = () => {
    if (username == "") {
      alert("Enter a username");
    } else if (password == "") {
      alert("Enter a password");
    }
    // TODO - SAVE USERNAME AND PASSWORD IN DB AND LOGIN AS USER
    else {
      try {
        const data = JSON.stringify({
          firstName: FirstName,
          lastName: LastName,
          username: username,
          password: password,
          fontsize: undefined,
          fontcolor: undefined,
          backgroundColor: undefined,
        });
        Cookies.set("login", username);
        Cookies.set("name", FirstName);
        Cookies.set(username, data);
        //
        navigate("/");
        // You'll update this function later...
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Create Account</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={FirstName}
          placeholder="Enter your first name here"
          onChange={(ev) => setFirstName(ev.target.value)}
          className={"inputBox"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={LastName}
          placeholder="Enter your last name here"
          onChange={(ev) => setLastName(ev.target.value)}
          className={"inputBox"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={username}
          placeholder="Enter username here"
          onChange={(ev) => setUsername(ev.target.value)}
          className={"inputBox"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Create Account"}
        />
      </div>
    </div>
  );
};

export default Create;
