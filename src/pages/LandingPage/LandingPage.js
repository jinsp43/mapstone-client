import { Link } from "react-router-dom";
import "./LandingPage.scss";

const LandingPage = () => {
  return (
    <main className="landing">
      <h1 className="landing__heading">The World,</h1>
      <h1 className="landing__heading">Your Way</h1>
      <h3 className="landing__subheading">
        Our Places lets you and your friends map out the world, in whatever way
        suits you!
      </h3>

      <div className="landing__link-wrapper">
        <Link to="/login" className="landing__link">
          Log In!
        </Link>
        <Link to="/signup" className="landing__link">
          Sign Up!
        </Link>
      </div>
    </main>
  );
};

export default LandingPage;
