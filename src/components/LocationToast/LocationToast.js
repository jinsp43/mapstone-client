import "./LocationToast.scss";
import addMarkerIcon from "../../assets/icons/AddMarker.svg";

const LocationToast = ({ locName, addMarker, lng, lat }) => {
  return (
    <article className="loc-toast">
      <div className="loc-toast__heading-wrapper">
        <h3 className="loc-toast__heading">{locName}</h3>
        <img
          onClick={() => addMarker(locName, lng, lat)}
          className="loc-toast__icon"
          src={addMarkerIcon}
          alt="add marker"
        />
      </div>
    </article>
  );
};

export default LocationToast;
