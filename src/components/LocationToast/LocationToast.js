import "./LocationToast.scss";
import addMarkerIcon from "../../assets/icons/AddMarker.svg";
import removeMarkerIcon from "../../assets/icons/RemoveMarker.svg";
import { useEffect, useState } from "react";

const LocationToast = ({
  feature,
  addMarker,
  deleteMarker,
  setLng,
  setLat,
}) => {
  const [isMarker, setIsMarker] = useState(false);
  const [markerId, setMarkerId] = useState(feature.id);

  // Initial load, get id and check if its already a marker
  useEffect(() => {
    setMarkerId(feature.id);
    console.log(feature);

    // if it is a marker, add params to URL
    if (feature.layer.id === "points") {
      setIsMarker(true);
      setLng(feature.geometry.coordinates[0]);
      setLat(feature.geometry.coordinates[1]);
      return window.history.pushState({}, "", `?id=${feature.id}`);
    }

    setIsMarker(false);
  }, [feature.id, feature.layer.id]);

  const addClickHandler = async () => {
    const addedMarker = await addMarker(
      feature.properties.name,
      feature.geometry.coordinates[0],
      feature.geometry.coordinates[1],
      feature.properties.type
    );
    // use the id of the marker instead of the poi
    setMarkerId(addedMarker.data.id);
    setIsMarker(true);
    window.history.pushState({}, "", `?id=${addedMarker.data.id}`);
  };

  const removeClickHandler = () => {
    deleteMarker(markerId);
    setIsMarker(false);
    window.history.pushState({}, "", window.location.pathname);
  };

  return (
    <article className="loc-toast">
      <div className="loc-toast__heading-wrapper">
        <h3 className="loc-toast__heading">{feature.properties.name}</h3>
        {isMarker ? (
          <img
            src={removeMarkerIcon}
            alt="remove marker"
            className="loc-toast__icon"
            onClick={removeClickHandler}
          />
        ) : (
          <img
            onClick={addClickHandler}
            className="loc-toast__icon"
            src={addMarkerIcon}
            alt="add marker"
          />
        )}
      </div>

      <p className="loc-toast__type">{feature.properties.type}</p>
    </article>
  );
};

export default LocationToast;
