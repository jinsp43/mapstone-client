import "./MobileNav.scss";
import people from "../../assets/icons/People.svg";
import marker from "../../assets/icons/Marker.svg";
import add from "../../assets/icons/Add.svg";
import settings from "../../assets/icons/Settings.svg";
import profile from "../../assets/icons/Profile.svg";

const MobileNav = () => {
  return (
    <nav className="mobile-nav">
      <img className="mobile-nav__icon" src={people} alt="Groups List" />
      <img className="mobile-nav__icon" src={marker} alt="Marker" />
      <img className="mobile-nav__icon" src={add} alt="Add" />
      <img className="mobile-nav__icon" src={settings} alt="Settings" />
      <img className="mobile-nav__icon" src={profile} alt="Profile" />
    </nav>
  );
};

export default MobileNav;
