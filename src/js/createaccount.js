// Create Account
// Welcome / Login screen
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CreateAccount = (props) => {
  const { updateLoginStatus } = props; // Destructuring the function from props
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");

  const navigate = useNavigate();

  const onButtonClick = () => {
<<<<<<< HEAD
    if (username == "") {
      alert("Enter a username");
    } else if (password == "") {
      alert("Enter a password");
    } else if (FirstName == "") {
      alert("Enter your first name");
    } else if (LastName == "") {
      alert("Enter your last name");
    } else {
      try {
        const data = JSON.stringify({
          firstName: FirstName,
          lastName: LastName,
          username: username,
          password: password,
          fontsize: "16px",
          fontcolor: "#000000",
          backgroundColor: "#FFFFFF",
        });
        Cookies.set("login", username);
        Cookies.set("name", FirstName);
        Cookies.set(username, data);
        updateLoginStatus(true); // Update login status
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
=======
    navigate("/");
    // You'll update this function later...
>>>>>>> main
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

export default CreateAccount;
