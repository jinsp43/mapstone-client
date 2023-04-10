import "./MobileNav.scss";
import people from "../../assets/icons/People.svg";
import marker from "../../assets/icons/Marker.svg";
import search from "../../assets/icons/Search.svg";
import closeSearch from "../../assets/icons/CloseSearch.svg";
import settings from "../../assets/icons/Settings.svg";
import profile from "../../assets/icons/Profile.svg";
import { Link } from "react-router-dom";

const MobileNav = ({ setShowSearch, showSearch, placesListToggle }) => {
  return (
    <nav className="mobile-nav">
      <Link to="/groups" className="mobile-nav__link">
        <img className="mobile-nav__icon" src={people} alt="Groups List" />
        <p className="mobile-nav__text">My Groups</p>
      </Link>

      <div onClick={placesListToggle} className="mobile-nav__link">
        <img className="mobile-nav__icon" src={marker} alt="Marker" />
        <p className="mobile-nav__text">Places</p>
      </div>

      <div
        className="mobile-nav__link"
        onClick={() => setShowSearch(!showSearch)}
      >
        {showSearch ? (
          <>
            <img
              className="mobile-nav__icon"
              src={closeSearch}
              alt="Close search"
            />
            <p className="mobile-nav__text">Close Search</p>
          </>
        ) : (
          <>
            <img className="mobile-nav__icon" src={search} alt="Search" />
            <p className="mobile-nav__text">Search</p>
          </>
        )}
      </div>

      <Link to="/settings" className="mobile-nav__link">
        <img className="mobile-nav__icon" src={settings} alt="Settings" />
        <p className="mobile-nav__text">Settings</p>
      </Link>

      <Link to="/profile" className="mobile-nav__link">
        <img className="mobile-nav__icon" src={profile} alt="Profile" />
        <p className="mobile-nav__text">My Profile</p>
      </Link>
    </nav>
  );
};

export default MobileNav;
