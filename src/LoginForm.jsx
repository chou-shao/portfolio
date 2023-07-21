import { useState } from "react";
import "./LoginForm.css";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [formError, setFormError] = useState({ errorMessage: "" });

  function isValidUsername(username) {
    if (username.toLowerCase() === "dog") {
      setFormError({
        errorMessage:
          "Oops! The username you have entered is invalid! Username cannot be 'dog.",
      });
      return false;
    }
    let isValid = true;
    isValid = isValid && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    if (!isValid) {
      setFormError({
        errorMessage:
          "Oops! Username cannot be blank, and must contain only letters and/or numbers. Please enter a valid username.",
      });
      return false;
    } else {
      setFormError({ errorMessage: "" });
      return true;
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let isValid = isValidUsername(username);
    if (isValid) {
      onLogin(username);
    }
  };

  return (
    <div className="login-form__container">
      <form onSubmit={onSubmitHandler} className="login-form" id="login-form">
        <h2 className="login-form__title">Login Page</h2>
        <span className="login-form__invalid">{formError.errorMessage}</span>
        <div className="login-form__username-container">
          <label htmlFor="username" className="username__label">
            Username:
          </label>
          <input
            onInput={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
            className="username__input"
            placeholder="Enter your username"
          />
        </div>
        <div className="login-button__container">
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
