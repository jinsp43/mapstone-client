import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header.js";
import { LOGIN, SIGNUP } from "../../utils/apiCalls.mjs";
import "./SignupPage.scss";
import { markerColours } from "../../utils/markerColours.mjs";

const SignupPage = () => {
  const [formFields, setFormFields] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    marker_colour: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  let confirmError;
  if (
    formFields.confirmPassword &&
    formFields.password !== formFields.confirmPassword
  ) {
    confirmError = "Passwords do not match";
  }

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
        marker_colour: formFields.marker_colour,
      });

      // Login automatically with new account
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

      <main className="signup-page">
        <div className="signup-page__heading-wrapper">
          <h1 className="signup-page__heading">Welcome to</h1>
          <h1 className="signup-page__heading">Our Places</h1>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <label htmlFor="username" className="signup-form__label">
            Enter a username:
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="username"
            className="signup-form__input"
            placeholder="Username..."
          />

          <label htmlFor="password" className="signup-form__label">
            Enter a password:
          </label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            className="signup-form__input"
            placeholder="Password..."
          />

          <label htmlFor="confirmPassword" className="signup-form__label">
            Confirm your password:
          </label>
          <input
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            className="signup-form__input"
            placeholder="Confirm password..."
          />
          {confirmError && <p className="signup-form__error">{confirmError}</p>}

          <label htmlFor="marker_colour" className="signup-form__label">
            (Optional) Your Favourite Colour
          </label>
          <select
            className="signup-form__input"
            name="marker_colour"
            onChange={handleChange}
          >
            <option value="">--Please Select--</option>
            {markerColours.map((markerColour) => (
              <option key={markerColour} value={markerColour}>
                {markerColour}
              </option>
            ))}
          </select>

          {errorMessage && <p className="signup-form__error">{errorMessage}</p>}

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
    </>
  );
};

export default SignupPage;
