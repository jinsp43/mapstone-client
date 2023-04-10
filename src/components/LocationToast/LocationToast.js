import "./LocationToast.scss";
import addMarkerIcon from "../../assets/icons/AddMarker.svg";
import removeMarkerIcon from "../../assets/icons/RemoveMarker.svg";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { GET_COMMENTS, POST_COMMENT } from "../../utils/apiCalls.mjs";
import CommentCard from "../CommentCard/CommentCard";
import AddCommentModal from "../AddCommentModal/AddCommentModal";

const LocationToast = ({ feature, addMarker, deleteMarker, noFeature }) => {
  const authToken = sessionStorage.getItem("authToken");

  const [isMarker, setIsMarker] = useState(false);
  const [markerId, setMarkerId] = useState(feature.id);
  const [comments, setComments] = useState([]);

  // Draggable Toast
  const toastRef = useRef(null);
  const [toastPos, setToastPos] = useState({ x: 0, y: 325 });

  const handleDragStop = (e, position) => {
    // small toast - either tap or drag opens toast
    if (toastPos.y === 325 && (position.y === 325 || position.y < 275)) {
      setToastPos({ x: 0, y: 0 });
    } else if (position.y > 50 && position.y <= 400) {
      setToastPos({ x: 0, y: 325 });
    } else if (position.y > 400) {
      noFeature();
    }
  };

  const getComments = async () => {
    try {
      const { data } = await GET_COMMENTS(feature.id, authToken);
      console.log(data);
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Initial load, get id and check if its already a marker
  useEffect(() => {
    setMarkerId(feature.id);

    // if it is a marker, add params to URL
    if (feature.layer.id === "points") {
      setIsMarker(true);

      getComments();
      return window.history.pushState({}, "", `?id=${feature.id}`);
    }

    setIsMarker(false);
  }, [feature, authToken]);

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

  const addComment = async (comment) => {
    await POST_COMMENT(markerId, comment, authToken);

    getComments();
  };

  const [showModal, setShowModal] = useState(false);

  const modalOpenHandler = () => setShowModal(true);
  const modalCloseHandler = () => setShowModal(false);

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
        <div className="loc-toast__drag-marker"></div>
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

        <section className="loc-toast__comment-list">
          <AddCommentModal
            show={showModal}
            modalCloseHandler={modalCloseHandler}
            addComment={addComment}
          />

          <div className="loc-toast__comment-wrapper">
            <h4 className="loc-toast__comment-heading">
              Comments ({comments.length})
            </h4>
            <button
              onClick={modalOpenHandler}
              className="loc-toast__comment-add"
            >
              Add A Comment
            </button>
          </div>
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </section>
      </article>
    </Draggable>
  );
};

export default LocationToast;
