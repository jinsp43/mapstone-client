import "./GroupCard.scss";
import groupIcon from "../../assets/icons/Group.svg";
import { USERS_IN_GROUP } from "../../utils/apiCalls.mjs";
import { useEffect, useState } from "react";

const GroupCard = ({ name, groupId, authToken }) => {
  const [usersInGroup, setUsersInGroup] = useState([]);

  const getUsers = async () => {
    try {
      const { data } = await USERS_IN_GROUP({ group_id: groupId }, authToken);

      console.log(data);
      setUsersInGroup(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <article onClick={getUsers} className="group-card">
      <img className="group-card__icon" src={groupIcon} alt="group" />
      <div className="group-card__text">
        <h4 className="group-card__name">{name}</h4>
        <p className="group-card__users">
          {usersInGroup.length} Member{usersInGroup.length === 1 ? "" : "s"}
        </p>
      </div>
    </article>
  );
};

export default GroupCard;
