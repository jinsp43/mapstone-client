import "./MobileNav.scss";
import people from "../../assets/icons/People.svg";
import marker from "../../assets/icons/Marker.svg";
import add from "../../assets/icons/Add.svg";
import settings from "../../assets/icons/Settings.svg";
import profile from "../../assets/icons/Profile.svg";

const MobileNav = ({ addPlace }) => {
  return (
    <nav className="mobile-nav">
      <div className="mobile-nav__link">
        <img className="mobile-nav__icon" src={people} alt="Groups List" />
        <p className="mobile-nav__text">My Groups</p>
      </div>

      <div className="mobile-nav__link">
        <img className="mobile-nav__icon" src={marker} alt="Marker" />
        <p className="mobile-nav__text">Places</p>
      </div>

      <div onClick={addPlace} className="mobile-nav__link">
        <img className="mobile-nav__icon" src={add} alt="Add" />
        <p className="mobile-nav__text">Add a Place</p>
      </div>

      <div className="mobile-nav__link">
        <img className="mobile-nav__icon" src={settings} alt="Settings" />
        <p className="mobile-nav__text">Settings</p>
      </div>

      <div className="mobile-nav__link">
        <img className="mobile-nav__icon" src={profile} alt="Profile" />
        <p className="mobile-nav__text">My Profile</p>
      </div>
    </nav>
  );
};

export default MobileNav;
