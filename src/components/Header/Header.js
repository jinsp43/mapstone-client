import "./Header.scss";
import logo from "../../assets/logo/Logo.svg";
import people from "../../assets/icons/People.svg";
import profile from "../../assets/icons/Profile.svg";
import { Link } from "react-router-dom";

const Header = ({ groupId, icons, map, modal }) => {
  const headerClass = () => {
    if (map) {
      return "header header--map";
    }

    if (modal) {
      return "header header--modal";
    }

    return "header";
  };
  return (
    <header className={headerClass()}>
      {icons && (
        <Link className="header__link" to={`/groups/${groupId}/groups`}>
          <img className="header__icon" src={people} alt="Groups" />
        </Link>
      )}
      <Link to="/">
        <img className="header__logo" src={logo} alt="Our Places Logo" />
      </Link>
      {icons && (
        <Link to={`/groups/${groupId}/profile`}>
          <img className="header__icon" src={profile} alt="Profile" />
        </Link>
      )}
    </header>
  );
};

export default Header;
