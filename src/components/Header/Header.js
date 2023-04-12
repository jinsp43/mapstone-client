import "./Header.scss";
import logo from "../../assets/logo/Logo.svg";
import people from "../../assets/icons/People.svg";
import profile from "../../assets/icons/Profile.svg";
import { Link } from "react-router-dom";

const Header = ({ icons }) => {
  return (
    <header className="header">
      {icons && <img className="header__icon" src={people} alt="Groups" />}
      <Link to="/">
        <img className="header__logo" src={logo} alt="Our Places Logo" />
      </Link>
      {icons && <img className="header__icon" src={profile} alt="Profile" />}
    </header>
  );
};

export default Header;
