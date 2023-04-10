import "./DeleteMarkerModal.scss";

const DeleteMarkerModal = ({
  show,
  modalCloseHandler,
  deleteMarkerHandler,
  name,
}) => {
  if (!show) {
    return null;
  }

  return (
    <article className="delete-marker-modal" onClick={modalCloseHandler}>
      <div
        className="delete-marker-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="delete-marker-modal__heading">Delete "{name}"?</h3>

        <p className="delete-marker-modal__text">
          Warning: Deleting this marker will delete any associated comments as
          well.
        </p>

        <button
          onClick={deleteMarkerHandler}
          className="delete-marker-modal__confirm"
        >
          Confirm Delete
        </button>

        <button
          onClick={modalCloseHandler}
          className="delete-marker-modal__cancel"
        >
          Cancel
        </button>
      </div>
    </article>
  );
};

export default DeleteMarkerModal;
