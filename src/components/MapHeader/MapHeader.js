import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GET_GROUP_DETAILS, USERS_IN_GROUP } from "../../utils/apiCalls.mjs";
import "./MapHeader.scss";
import back from "../../assets/icons/Back.svg";

const MapHeader = ({ groupId }) => {
  const navigate = useNavigate();
  const authToken = sessionStorage.getItem("authToken");

  const [groupDetails, setGroupDetails] = useState();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getGroupDetails = async () => {
      try {
        const { data } = await GET_GROUP_DETAILS(groupId, authToken);

        setGroupDetails(data);
      } catch (error) {
        console.log(error);

        if ((error.response.status = 401)) {
          navigate("/groups");
        }
      }
    };

    const getMembers = async () => {
      try {
        const { data } = await USERS_IN_GROUP(groupId, authToken);

        setMembers(data);
      } catch (error) {
        console.log(error);
      }
    };

    getGroupDetails();
    getMembers();
  }, [authToken, groupId, navigate]);

  if (!groupDetails) {
    return null;
  }

  return (
    <header className="map-header">
      <img
        onClick={() => navigate("/groups")}
        className="map-header__icon"
        src={back}
        alt="Back arrow"
      />

      <Link to={`/groups/${groupId}/members`} className="map-header__wrapper">
        <h3 className="map-header__group">{groupDetails.group_name}</h3>
        <p className="map-header__numbers">
          {members.length} {members.length === 1 ? "mapper" : "mappers"}
        </p>
      </Link>
    </header>
  );
};

export default MapHeader;
