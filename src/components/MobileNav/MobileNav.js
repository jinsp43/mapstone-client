import "./MobileNav.scss";
import people from "../../assets/icons/People.svg";
import marker from "../../assets/icons/Marker.svg";
import search from "../../assets/icons/Search.svg";
import closeSearch from "../../assets/icons/CloseSearch.svg";
import settings from "../../assets/icons/Settings.svg";
import profile from "../../assets/icons/Profile.svg";
import { Link } from "react-router-dom";

const MobileNav = ({
  groupId,
  setShowSearch,
  showSearch,
  placesListToggle,
  settingsToggle,
  profileToggle,
}) => {
  return (
    <nav className="mobile-nav">
      <Link to={`/groups/${groupId}/members`} className="mobile-nav__link">
        <img className="mobile-nav__icon" src={people} alt="Groups List" />
        <p className="mobile-nav__text">Members</p>
      </Link>

      <Link to={`/groups/${groupId}/places`} className="mobile-nav__link">
        <img className="mobile-nav__icon" src={marker} alt="Marker" />
        <p className="mobile-nav__text">Places</p>
      </Link>

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

      <div onClick={settingsToggle} className="mobile-nav__link">
        <img className="mobile-nav__icon" src={settings} alt="Settings" />
        <p className="mobile-nav__text">Settings</p>
      </div>

      <div onClick={profileToggle} className="mobile-nav__link">
        <img className="mobile-nav__icon" src={profile} alt="Profile" />
        <p className="mobile-nav__text">My Profile</p>
      </div>
    </nav>
  );
};

export default MobileNav;
