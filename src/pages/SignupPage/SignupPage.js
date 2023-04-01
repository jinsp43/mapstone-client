import { useState } from "react";
import { Link } from "react-router-dom";
import { SIGNUP } from "../../utils/apiCalls.mjs";
import "./SignupPage.scss";

const SignupPage = () => {
  const [formFields, setFormFields] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    marker_colour: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });

    // could check pass and confirmpass dynamically if there is content in confirmpass
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (
      !formFields.username ||
      !formFields.password ||
      !formFields.confirmPassword
    ) {
      setErrorMessage("Please ensure all fields have been filled");
      return;
    }

    if (formFields.password !== formFields.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      await SIGNUP({
        username: formFields.username,
        password: formFields.password,
      });
    } catch (error) {
      console.log(error.response);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <main className="signup-page">
      <h1 className="signup-page__heading">Welcome to Our Places</h1>

      <form onSubmit={handleSubmit} className="signup-form">
        <label htmlFor="username" className="signup-form__label">
          Enter a username:
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="username"
          className="signup-form__input"
          placeholder="Enter a username..."
        />

        <label htmlFor="password" className="signup-form__label">
          Enter a password:
        </label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          className="signup-form__input"
          placeholder="Enter a password..."
        />

        <label htmlFor="confirmPassword" className="signup-form__label">
          Confirm your password:
        </label>
        <input
          onChange={handleChange}
          type="password"
          name="confirmPassword"
          className="signup-form__input"
          placeholder="Confirm your password..."
        />

        {errorMessage && <p>{errorMessage}</p>}

        <button className="signup-form__submit" type="submit">
          Sign Up
        </button>
      </form>

      <div className="signup-page__new-wrapper">
        <p className="signup-page__text">Already have an account? </p>
        <Link to="/login" className="signup-page__link">
          Login
        </Link>
      </div>
    </main>
  );
};

export default SignupPage;
