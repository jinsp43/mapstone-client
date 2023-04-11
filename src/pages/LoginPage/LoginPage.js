import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header.js";
import { LOGIN } from "../../utils/apiCalls.mjs";
import "./LoginPage.scss";

const LoginPage = () => {
  const [formFields, setFormFields] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formFields.username || !formFields.password) {
      setErrorMessage("You must provide a username and a password");
      return;
    }

    try {
      const { data } = await LOGIN(formFields);

      sessionStorage.setItem("authToken", data.authToken);

      navigate("/groups");
    } catch (error) {
      console.log(error.response);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <Header />

      <main className="login-page">
        <h1 className="login-page__heading">Welcome Back!</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-form__label" htmlFor="username">
            Username
          </label>
          <input
            onChange={handleChange}
            className="login-form__input"
            type="text"
            name="username"
            placeholder="Enter your username..."
          />

          <label className="login-form__label" htmlFor="password">
            Password
          </label>
          <input
            onChange={handleChange}
            className="login-form__input"
            type="password"
            name="password"
            placeholder="Enter your password..."
          />

          {errorMessage && <p>{errorMessage}</p>}

          <button className="login-form__submit" type="submit">
            Log In
          </button>
        </form>

        <div className="login-page__new-wrapper">
          <p className="login-page__text">New Here?</p>
          <Link to="/signup" className="login-page__link">
            Sign Up
          </Link>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
