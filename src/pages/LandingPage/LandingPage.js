import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./LandingPage.scss";
import globe from "../../assets/videos/globe.mp4";

const LandingPage = () => {
  return (
    <>
      <Header />

      <main className="landing">
        <div className="landing-hero">
          <video
            autoPlay
            loop
            muted
            src={globe}
            className="landing__video"
            typeof="video/mp4"
          ></video>
          <div className="landing-hero__text">
            <h1 className="landing__heading">The World,</h1>
            <h1 className="landing__heading">Your Way</h1>
          </div>
        </div>

        <div className="landing__link-wrapper">
          <Link to="/login" className="landing__link">
            Log In!
          </Link>
          <Link to="/signup" className="landing__link">
            Sign Up!
          </Link>
        </div>

        <h3 className="landing__subheading">
          Our Places lets you and your friends map out the world, in whatever
          way suits you!
        </h3>
      </main>
    </>
  );
};

export default LandingPage;
