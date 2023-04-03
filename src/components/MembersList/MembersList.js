import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_PROFILE } from "../../utils/apiCalls.mjs";
import "./MembersList.scss";

const MembersList = () => {
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const authToken = sessionStorage.getItem("authToken");

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

    if (!authToken) {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);

  return (
    <section className="members">
      <div className="members__heading-wrapper">
        <h3 className="members__heading">Groups</h3>
        <p className="members__username">Your username: {userData.username}</p>
      </div>

      <div className="members__list">
        {/* {groups.length ? (
          groups.map((group) => (
            <GroupCard
              key={group.id}
              name={group.group_name}
              groupId={group.id}
              authToken={authToken}
            />
          ))
        ) : (
          <div className="members__no-members-wrapper">
            <h4 className="members__no-members">Join or Create A New Group</h4>
            <h4 className="members__no-members">To Get Started!</h4>
          </div>
        )} */}

        {/* <CreateGroupModal
          getGroups={getGroups}
          show={showModal}
          authToken={authToken}
          modalCloseHandler={modalCloseHandler}
        /> */}

        {/* <button onClick={modalOpenHandler} className="members__create-btn">
          Create A New Group
        </button> */}
      </div>
    </section>
  );
};

export default MembersList;
