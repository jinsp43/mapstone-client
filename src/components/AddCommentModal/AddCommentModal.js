import { useState } from "react";
import { POST_COMMENT } from "../../utils/apiCalls.mjs";
import "./AddCommentModal.scss";

const AddCommentModal = ({ show, modalCloseHandler, addComment }) => {
  const [formFields, setFormFields] = useState({
    comment: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formFields.comment) {
      setErrorMessage("You must enter a comment");
      return;
    }

    try {
      addComment(formFields);

      modalCloseHandler();
    } catch (error) {
      console.log(error.response);
      setErrorMessage(error.response.data.message);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <article className="add-comment-modal" onClick={modalCloseHandler}>
      <div
        className="add-comment-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="add-comment-modal__place">Place</h3>
        <h4 className="add-comment-modal__heading">Add A Comment</h4>

        <form onSubmit={handleSubmit} className="add-comment-modal__form">
          <input
            onChange={handleChange}
            className="add-comment-modal__input"
            name="comment"
            type="text"
            placeholder="Type your comment..."
          />

          {errorMessage && (
            <p className="add-friend-modal__error">{errorMessage}</p>
          )}

          <button className="add-comment-modal__submit" type="submit">
            Post Comment!
          </button>

          <button
            onClick={modalCloseHandler}
            className="add-comment-modal__cancel"
            type="button"
          >
            Cancel
          </button>
        </form>
      </div>
    </article>
  );
};

export default AddCommentModal;
