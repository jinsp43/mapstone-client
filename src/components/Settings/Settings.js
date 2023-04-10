import "./Settings.scss";
import close from "../../assets/icons/Close.svg";

const Settings = ({ show, settingsCloseHandler }) => {
  if (!show) {
    return null;
  }

  return (
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
    </section>
  );
};

export default Settings;
