import { Link } from "react-router-dom";
import "./LoginPage.scss";

const LoginPage = () => {
  return (
    <main className="login-page">
      <h1 className="login-page__heading">Welcome Back!</h1>

      <form className="login-form">
        <label className="login-form__label" htmlFor="username">
          Username
        </label>
        <input className="login-form__input" type="text" name="username" />

        <label className="login-form__label" htmlFor="password">
          Password
        </label>
        <input className="login-form__input" type="password" name="password" />

        <button className="login-form__submit" type="submit">
          Log In
        </button>
      </form>

      <p className="login-page__text">New Here?</p>
      <Link className="login-page__link">Sign Up</Link>
    </main>
  );
};

export default LoginPage;
