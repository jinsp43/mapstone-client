import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GET_GROUP_DETAILS,
  GET_PROFILE,
  USERS_IN_GROUP,
} from "../../utils/apiCalls.mjs";
import MemberCard from "../MemberCard/MemberCard.js";
import "./MembersList.scss";

const MembersList = () => {
  const [userData, setUserData] = useState({});
  const [members, setMembers] = useState([]);
  const [groupDetails, setGroupDetails] = useState();

  const navigate = useNavigate();

  const { groupId } = useParams();

  console.log(groupId);

  const authToken = sessionStorage.getItem("authToken");

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

    const getUsers = async () => {
      try {
        const { data } = await USERS_IN_GROUP(groupId, authToken);

        setMembers(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getGroupDetails = async () => {
      try {
        const { data } = await GET_GROUP_DETAILS(groupId, authToken);
        console.log(data);
        setGroupDetails(data);
      } catch (error) {
        console.log(error);
      }
    };

    getGroupDetails();
    getUser();
    getUsers();

    if (!authToken) {
      navigate("/login");
    }
  }, [authToken, groupId, navigate]);

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
          />
        ))}

        {/* <CreateGroupModal
          getGroups={getGroups}
          show={showModal}
          authToken={authToken}
          modalCloseHandler={modalCloseHandler}
        /> */}

        <button className="members__create-btn">+ Add A Friend</button>
      </div>
    </section>
  );
};

export default MembersList;
