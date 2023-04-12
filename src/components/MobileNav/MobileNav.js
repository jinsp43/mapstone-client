import "./MobileNav.scss";
import people from "../../assets/icons/People.svg";
import marker from "../../assets/icons/Marker.svg";
import search from "../../assets/icons/Search.svg";
import closeSearch from "../../assets/icons/CloseSearch.svg";
import map from "../../assets/icons/Map.svg";
import profile from "../../assets/icons/Profile.svg";
import { Link, NavLink } from "react-router-dom";

const MobileNav = ({ groupId, setShowSearch, showSearch }) => {
  return (
    <nav className="mobile-nav">
      <NavLink to={`/groups/${groupId}/members`} className="mobile-nav__link">
        <img className="mobile-nav__icon" src={people} alt="Groups List" />
        <p className="mobile-nav__text">Members</p>
      </NavLink>

      <NavLink to={`/groups/${groupId}/places`} className="mobile-nav__link">
        <img className="mobile-nav__icon" src={marker} alt="Marker" />
        <p className="mobile-nav__text">Places</p>
      </NavLink>

      <NavLink to={`/groups/${groupId}/`} className="mobile-nav__link">
        <img className="mobile-nav__icon" src={map} alt="Map" />
        <p className="mobile-nav__text">Map</p>
      </NavLink>

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

      <NavLink to={`/groups/${groupId}/profile`} className="mobile-nav__link">
        <img className="mobile-nav__icon" src={profile} alt="Profile" />
        <p className="mobile-nav__text">My Profile</p>
      </NavLink>
    </nav>
  );
};

export default MobileNav;
