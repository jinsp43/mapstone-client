import { useEffect, useState } from "react";
import { GET_GROUPS, GET_PROFILE } from "../../utils/apiCalls.mjs";
import "./GroupsList.scss";
import GroupCard from "../GroupCard/GroupCard.js";

const GroupsList = () => {
  const [userData, setUserData] = useState({});
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");

    const getUser = async () => {
      try {
        const { data } = await GET_PROFILE(authToken);
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getGroups = async () => {
      try {
        const { data } = await GET_GROUPS(authToken);
        console.log(data);
        setGroups(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
    getGroups();
  }, []);

  return (
    <section className="groups">
      <div className="groups__heading-wrapper">
        <h3 className="groups__heading">Groups</h3>
        <p className="groups__username">Your username: {userData.username}</p>
      </div>

      <div className="groups__list">
        {groups.length ? (
          groups.map((group) => (
            <GroupCard key={group.id} name={group.group_name} />
          ))
        ) : (
          <div className="groups__no-groups-wrapper">
            <h4 className="groups__no-groups">Join or Create A New Group</h4>
            <h4 className="groups__no-groups">To Get Started!</h4>
          </div>
        )}
        <button className="groups__create-btn">Create A New Group</button>
      </div>
    </section>
  );
};

export default GroupsList;
