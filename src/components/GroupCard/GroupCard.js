import "./GroupCard.scss";
import groupIcon from "../../assets/icons/Group.svg";
import { USERS_IN_GROUP } from "../../utils/apiCalls.mjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GroupCard = ({ name, groupId, authToken }) => {
  const [usersInGroup, setUsersInGroup] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await USERS_IN_GROUP(groupId, authToken);

        setUsersInGroup(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, [authToken, groupId]);

  return (
    <Link className="group-card__link" to={`/groups/${groupId}/`}>
      <article className="group-card">
        <img className="group-card__icon" src={groupIcon} alt="group" />
        <div className="group-card__text">
          <h4 className="group-card__name">{name}</h4>
          <p className="group-card__users">
            {usersInGroup.length} Member{usersInGroup.length === 1 ? "" : "s"}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default GroupCard;
