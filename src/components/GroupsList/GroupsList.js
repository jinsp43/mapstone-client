import { useEffect, useState } from "react";
import { GET_GROUPS, GET_PROFILE } from "../../utils/apiCalls.mjs";
import "./GroupsList.scss";
import GroupCard from "../GroupCard/GroupCard.js";
import CreateGroupModal from "../CreateGroupModal/CreateGroupModal.js";
import { useNavigate } from "react-router-dom";

const GroupsList = () => {
  const [userData, setUserData] = useState({});
  const [groups, setGroups] = useState([]);

  const navigate = useNavigate();

  // Initial Render
  const authToken = sessionStorage.getItem("authToken");

  const getGroups = async () => {
    try {
      const { data } = await GET_GROUPS(authToken);

      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await GET_PROFILE(authToken);
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.log(error);

        if ((error.response.status = 401)) {
          navigate("/login");
        }
      }
    };

    getUser();
    getGroups();

    if (!authToken) {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);

  const [showModal, setShowModal] = useState(false);

  const modalOpenHandler = () => setShowModal(true);
  const modalCloseHandler = () => setShowModal(false);

  return (
    <section className="groups">
      <div className="groups__heading-wrapper">
        <h3 className="groups__heading">Groups</h3>
        <p className="groups__username">Your username: {userData.username}</p>
      </div>

      <div className="groups__list">
        {groups.length ? (
          groups.map((group) => (
            <GroupCard
              key={group.id}
              name={group.group_name}
              groupId={group.id}
              authToken={authToken}
            />
          ))
        ) : (
          <div className="groups__no-groups-wrapper">
            <h4 className="groups__no-groups">Join or Create A New Group</h4>
            <h4 className="groups__no-groups">To Get Started!</h4>
          </div>
        )}

        <CreateGroupModal
          getGroups={getGroups}
          show={showModal}
          authToken={authToken}
          modalCloseHandler={modalCloseHandler}
        />

        <button onClick={modalOpenHandler} className="groups__create-btn">
          Create A New Group
        </button>
      </div>
    </section>
  );
};

export default GroupsList;
