import PlaceCard from "../PlaceCard/PlaceCard";
import "./PlacesList.scss";
import close from "../../assets/icons/Close.svg";
import { Link } from "react-router-dom";

const PlacesList = ({ show, markers, groupId }) => {
  if (!show) {
    return null;
  }

  return (
    <section className="places-list">
      <div className="places-list__heading-wrapper">
        <h3 className="places-list__heading">Places</h3>

        <Link className="places-list__icon" to={`/groups/${groupId}/`}>
          <img src={close} alt="Close" />
        </Link>
      </div>

      {markers.map((marker) => (
        <PlaceCard key={marker.id} marker={marker} groupId={groupId} />
      ))}
    </section>
  );
};

export default PlacesList;
