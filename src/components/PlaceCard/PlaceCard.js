import "./PlaceCard.scss";

const PlaceCard = ({ marker }) => {
  return (
    <article className="place-card">
      <div className="place-card__wrapper">
        <img
          src={`http://localhost:5050/images/marker-${marker.marker_colour}.png`}
          alt="marker"
          className="place-card__icon"
        />

        <div className="place-card__text-wrapper">
          <h4 className="place-card__place">{marker.name}</h4>

          <p className="place-card__type">{marker.type}</p>
          <p className="place-card__username">{marker.username}'s Place</p>
        </div>
      </div>
    </article>
  );
};

export default PlaceCard;
