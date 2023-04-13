import "./Profile.scss";
import close from "../../assets/icons/Close.svg";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GET_PROFILE, UPDATE_MARKER_COLOUR } from "../../utils/apiCalls.mjs";
import Header from "../Header/Header";
import { markerColours } from "../../utils/markerColours.mjs";

const Profile = ({ show, groupId }) => {
  const [userData, setUserData] = useState({});
  const [formFields, setFormFields] = useState("");

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
  }, [authToken, navigate, formFields]);

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleChange = async (e) => {
    const newColour = {
      marker_colour: e.target.value,
    };
    await UPDATE_MARKER_COLOUR(newColour, authToken);

    setFormFields(newColour);
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

          <Link className="profile__icon" to={`/groups/${groupId}/`}>
            <img className="profile__icon" src={close} alt="Close" />
          </Link>
        </div>

        <div className="profile__settings">
          <div className="profile__marker-colour">
            {userData.marker_colour && (
              <img
                src={`http://localhost:5050/images/marker-${userData.marker_colour}.png`}
                alt="marker"
                className="profile__marker"
              />
            )}
            <p className="profile__text">Your marker colour:</p>

            <select
              className="profile__select"
              name="marker_colour"
              onChange={handleChange}
            >
              <option
                className="profile__option"
                value={userData.marker_colour}
              >
                {userData.marker_colour}
              </option>
              {markerColours
                .filter(
                  (markerColour) => markerColour !== userData.marker_colour
                )
                .map((markerColour) => (
                  <option
                    className="profile__option"
                    key={markerColour}
                    value={markerColour}
                  >
                    {markerColour}
                  </option>
                ))}
            </select>
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
