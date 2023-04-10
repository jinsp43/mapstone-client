import PlaceCard from "../PlaceCard/PlaceCard";
import "./PlacesList.scss";
import close from "../../assets/icons/Close.svg";

const PlacesList = ({
  show,
  markers,
  placesListCloseHandler,
  getFeatureFromParams,
}) => {
  if (!show) {
    return null;
  }

  return (
    <section className="places-list">
      <div className="places-list__heading-wrapper">
        <h3 className="places-list__heading">Places</h3>

        <img
          onClick={placesListCloseHandler}
          className="places-list__icon"
          src={close}
          alt="Close"
        />
      </div>

      {markers.map((marker) => (
        <PlaceCard
          key={marker.id}
          marker={marker}
          getFeatureFromParams={getFeatureFromParams}
          placesListCloseHandler={placesListCloseHandler}
        />
      ))}
    </section>
  );
};

export default PlacesList;
