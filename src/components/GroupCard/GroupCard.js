import "./GroupCard.scss";
import groupIcon from "../../assets/icons/Group.svg";

const GroupCard = ({ name }) => {
  return (
    <article className="group-card">
      <img className="group-card__icon" src={groupIcon} alt="group" />
      <div className="group-card__text">
        <h4 className="group-card__name">{name}</h4>
      </div>
    </article>
  );
};

export default GroupCard;
