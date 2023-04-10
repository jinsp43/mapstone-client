import PlaceCard from "../PlaceCard/PlaceCard";
import "./PlacesList.scss";

const PlacesList = ({ show, markers }) => {
  if (!show) {
    return null;
  }

  console.log(markers);

  return (
    <section className="places-list">
      <h3 className="places-list__heading">Places</h3>

      {markers.map((marker) => (
        <PlaceCard key={marker.id} marker={marker} />
      ))}
    </section>
  );
};

export default PlacesList;
