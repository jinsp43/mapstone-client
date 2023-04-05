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
  const [markerId, setMarkerId] = useState();

  const addClickHandler = async () => {
    const addedMarker = await addMarker(locName, lng, lat);
    setMarkerId(addedMarker.data.id);
    setIsMarker(true);
  };

  const removeClickHandler = () => {
    deleteMarker(markerId || id);
    setIsMarker(false);
    setMarkerId();
  };

  useEffect(() => {
    layer === "points" ? setIsMarker(true) : setIsMarker(false);
  }, [layer]);

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
