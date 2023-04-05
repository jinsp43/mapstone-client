import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  GET_GROUP_DETAILS,
  GET_PROFILE,
  USERS_IN_GROUP,
} from "../../utils/apiCalls.mjs";
import AddFriendModal from "../AddFriendModal/AddFriendModal.js";
import MemberCard from "../MemberCard/MemberCard.js";
import "./MembersList.scss";

const MembersList = () => {
  const [userData, setUserData] = useState({});
  const [members, setMembers] = useState([]);
  const [groupDetails, setGroupDetails] = useState();

  const navigate = useNavigate();

  const { groupId } = useParams();

  const authToken = sessionStorage.getItem("authToken");

  if (!authToken) {
    navigate("/login");
  }

  const getMembers = useCallback(async () => {
    try {
      const { data } = await USERS_IN_GROUP(groupId, authToken);

      setMembers(data);
    } catch (error) {
      console.log(error);
    }
  }, [authToken, groupId]);

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

    getGroupDetails();
    getUser();
    getMembers();
  }, [authToken, groupId, navigate, getMembers]);

  const [showModal, setShowModal] = useState(false);

  const modalOpenHandler = () => setShowModal(true);
  const modalCloseHandler = () => setShowModal(false);

  if (!groupDetails) {
    return <p>Loading...</p>;
  }

  return (
    <section className="members">
      <div className="members__heading-wrapper">
        <h3 className="members__heading">{groupDetails.group_name}</h3>
        <p className="members__username">Est. {groupDetails.created_at}</p>
      </div>

      <div className="members__list">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            name={member.username}
            colour={member.marker_colour}
            id={member.id}
          />
        ))}

        <AddFriendModal
          show={showModal}
          modalCloseHandler={modalCloseHandler}
          getMembers={getMembers}
        />

        <button onClick={modalOpenHandler} className="members__create-btn">
          + Add A Friend
        </button>

        <Link to={`/map/${groupId}`} className="members__map-btn">
          Go To Map
        </Link>
      </div>
    </section>
  );
};

export default MembersList;
