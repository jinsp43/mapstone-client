import "./Settings.scss";
import close from "../../assets/icons/Close.svg";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const Settings = ({ show, settingsCloseHandler }) => {
  const navigate = useNavigate();

  if (!show) {
    return null;
  }

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="settings__wrapper">
      <Header />

      <section className="settings">
        <div className="settings__heading-wrapper">
          <h3 className="settings__heading">Settings</h3>

          <img
            onClick={settingsCloseHandler}
            className="settings__icon"
            src={close}
            alt="Close"
          />
        </div>

        <button onClick={handleLogout} className="settings__logout">
          Log Out
        </button>
      </section>
    </div>
  );
};

export default Settings;
