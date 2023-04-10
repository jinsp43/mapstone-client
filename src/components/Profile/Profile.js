import "./Profile.scss";
import close from "../../assets/icons/Close.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_PROFILE } from "../../utils/apiCalls.mjs";

const Profile = ({ show, profileCloseHandler }) => {
  const [userData, setUserData] = useState({});

  const authToken = sessionStorage.getItem("authToken");

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await GET_PROFILE(authToken);

        setUserData(data);
      } catch (error) {
        console.log(error);

        if ((error.response.status = 401)) {
          navigate("/login");
        }
      }
    };

    getUser();

    if (!authToken) {
      navigate("/login");
    }
  }, [authToken, navigate]);

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
      <h4 className="profile__welcome">Hi {userData.username}!</h4>
      <p className="profile__text">
        Your marker colour is {userData.marker_colour}
      </p>
      <p className="profile__since">
        You've been mapping out your world since {userData.created_at}
      </p>
    </section>
  );
};

export default Profile;
