import "./LocationToast.scss";
import addMarkerIcon from "../../assets/icons/AddMarker.svg";
import removeMarkerIcon from "../../assets/icons/RemoveMarker.svg";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

const LocationToast = ({ feature, addMarker, deleteMarker, noFeature }) => {
  const [isMarker, setIsMarker] = useState(false);
  const [markerId, setMarkerId] = useState(feature.id);

  // Draggable Toast
  const toastRef = useRef(null);
  const [toastPos, setToastPos] = useState({ x: 0, y: 350 });

  const handleDragStop = (e, position) => {
    if (toastPos.y === 350 && position.y < 300) {
      setToastPos({ x: 0, y: 0 });
    } else if (position.y > 50 && position.y <= 425) {
      setToastPos({ x: 0, y: 350 });
    } else if (position.y > 425) {
      noFeature();
    }
  };

  // Initial load, get id and check if its already a marker
  useEffect(() => {
    setMarkerId(feature.id);

    // if it is a marker, add params to URL
    if (feature.layer.id === "points") {
      setIsMarker(true);
      return window.history.pushState({}, "", `?id=${feature.id}`);
    }

    setIsMarker(false);
  }, [feature]);

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
    <Draggable
      axis="y"
      nodeRef={toastRef}
      position={toastPos}
      onStop={handleDragStop}
      bounds={{ top: 0, bottom: 500 }}
      cancel=".loc-toast__icon"
    >
      <article ref={toastRef} className="loc-toast">
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
        {feature.properties.username && (
          <p className="loc-toast__user">
            {feature.properties.username}'s Place
          </p>
        )}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quasi
          natus minima obcaecati ea voluptatibus incidunt? Cumque nisi, illo
          quos ipsam aspernatur reprehenderit provident. Excepturi ducimus id
          itaque nemo asperiores?
        </p>
      </article>
    </Draggable>
  );
};

export default LocationToast;
