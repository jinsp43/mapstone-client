import "./Profile.scss";
import close from "../../assets/icons/Close.svg";

const Profile = ({ show, profileCloseHandler }) => {
  if (!show) {
    return null;
  }

  return (
    <section className="profile">
      <div className="profile__heading-wrapper">
        <h3 className="profile__heading">Profile</h3>

        <img
          onClick={profileCloseHandler}
          className="profile__icon"
          src={close}
          alt="Close"
        />
      </div>
    </section>
  );
};

export default Profile;
