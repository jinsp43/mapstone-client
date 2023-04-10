import "./LocationToast.scss";
import addMarkerIcon from "../../assets/icons/AddMarker.svg";
import removeMarkerIcon from "../../assets/icons/RemoveMarker.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import {
  EDIT_COMMENT,
  GET_COMMENTS,
  POST_COMMENT,
} from "../../utils/apiCalls.mjs";
import { useNavigate } from "react-router-dom";
import Comments from "../Comments/Comments";
import { parseJwt } from "../../utils/parseJwt.mjs";
import DeleteMarkerModal from "../DeleteMarkerModal/DeleteMarkerModal";

const LocationToast = ({ feature, addMarker, deleteMarker, noFeature }) => {
  const authToken = sessionStorage.getItem("authToken");

  const currentUserId = parseJwt(authToken).id;

  const navigate = useNavigate();

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

  const getComments = useCallback(async () => {
    try {
      const { data } = await GET_COMMENTS(markerId, authToken);

      const sortedComments = data.sort((a, b) => b.updated_at - a.updated_at);
      setComments(sortedComments);
    } catch (error) {
      console.log(error);

      if (error.response.status === 401) {
        navigate("/login");
      }
    }
  }, [authToken, markerId, navigate]);

  useEffect(() => {
    getComments();
  }, [markerId, getComments]);

  // Initial load, get id and check if its already a marker
  useEffect(() => {
    setMarkerId(feature.id);

    // if it is a marker, add params to URL
    if (feature.layer.id === "points") {
      setIsMarker(true);

      //   getComments();
      return window.history.pushState({}, "", `?id=${feature.id}`);
    }

    setIsMarker(false);
    setComments([]);
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

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteModalOpenHandler = () => setShowDeleteModal(true);
  const deleteModalCloseHandler = () => setShowDeleteModal(false);

  const deleteMarkerHandler = () => {
    deleteMarker(markerId);
    setIsMarker(false);
    window.history.pushState({}, "", window.location.pathname);
    deleteModalCloseHandler();
  };

  const removeClickHandler = () => {
    deleteModalOpenHandler();
  };

  const addComment = async (comment) => {
    await POST_COMMENT(markerId, comment, authToken);

    getComments();
  };

  const editComment = async (commentId, comment) => {
    await EDIT_COMMENT(commentId, comment, authToken);

    getComments();
  };

  return (
    <>
      <DeleteMarkerModal
        show={showDeleteModal}
        modalCloseHandler={deleteModalCloseHandler}
        deleteMarkerHandler={deleteMarkerHandler}
        name={feature.properties.name}
      />

      <Draggable
        axis="y"
        nodeRef={toastRef}
        position={toastPos}
        onStop={handleDragStop}
        bounds={{ top: 0, bottom: 500 }}
        handle=".loc-toast__handle"
        cancel=".loc-toast__icon"
      >
        <article ref={toastRef} className="loc-toast">
          <div className="loc-toast__handle">
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
          </div>

          {isMarker && (
            <Comments
              comments={comments}
              addComment={addComment}
              editComment={editComment}
              currentUserId={currentUserId}
            />
          )}
        </article>
      </Draggable>
    </>
  );
};

export default LocationToast;
