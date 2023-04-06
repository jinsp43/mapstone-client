import "./LocationToast.scss";
import addMarkerIcon from "../../assets/icons/AddMarker.svg";
import removeMarkerIcon from "../../assets/icons/RemoveMarker.svg";
import { useEffect, useState } from "react";

const LocationToast = ({
  id,
  locName,
  addMarker,
  deleteMarker,
  lng,
  lat,
  layer,
}) => {
  const [isMarker, setIsMarker] = useState(false);
  const [markerId, setMarkerId] = useState(id);

  // Initial load, get id and check if its already a marker
  useEffect(() => {
    console.log(`marker id updated to ${id}`);
    setMarkerId(id);

    // if it is a marker, add params to URL
    if (layer === "points") {
      setIsMarker(true);
      return window.history.pushState({}, "", `?id=${id}`);
    }

    setIsMarker(false);
  }, [id, layer]);

  const addClickHandler = async () => {
    const addedMarker = await addMarker(locName, lng, lat);
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
        <h3 className="loc-toast__heading">{locName}</h3>
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
    </article>
  );
};

export default LocationToast;
