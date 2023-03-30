import "./Header.scss";
import logo from "../../assets/logo/Logo.svg";
import people from "../../assets/icons/People.svg";
import profile from "../../assets/icons/Profile.svg";

const Header = () => {
  return (
    <header className="header">
      <img className="header__icon" src={people} alt="Groups" />
      <img className="header__logo" src={logo} alt="Our Places Logo" />
      <img className="header__icon" src={profile} alt="Profile" />
    </header>
  );
};

export default Header;
