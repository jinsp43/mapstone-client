import "./Profile.scss";
import close from "../../assets/icons/Close.svg";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GET_PROFILE } from "../../utils/apiCalls.mjs";
import Header from "../Header/Header";

const Profile = ({ show, groupId }) => {
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

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };

  if (!show) {
    return null;
  }

  return (
    <div className="profile__wrapper">
      <Header />

      <section className="profile">
        <div className="profile__heading">
          <div className="profile__heading-text">
            <h3 className="profile__name">Hi, {userData.username}!</h3>
            <p className="profile__created-at">
              Mapping since {userData.created_at}
            </p>
          </div>

          <Link className="profile__icon" to={`/groups/${groupId}`}>
            <img className="profile__icon" src={close} alt="Close" />
          </Link>
        </div>

        <div className="profile__settings">
          <div className="profile__marker-colour">
            <img
              src={`http://localhost:5050/images/marker-${userData.marker_colour}.png`}
              alt="marker"
              className="profile__marker"
            />
            <p className="profile__text">
              Your marker colour is {userData.marker_colour}
            </p>
          </div>

          <button onClick={handleLogout} className="profile__logout">
            Log Out
          </button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
