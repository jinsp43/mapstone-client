import { useState } from "react";
import calcTime from "../../utils/calcTime.mjs";
import "./CommentCard.scss";

const CommentCard = ({ comment, edit, editComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formFields, setFormFields] = useState({
    comment: comment.comment,
  });

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!formFields.comment) {
      setErrorMessage("You must enter a comment");
      return;
    }

    try {
      editComment(comment.id, formFields);
    } catch (error) {
      console.log(error.response);
      setErrorMessage(error.response.data.message);
    }

    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <article key={comment.id} className="comment__wrapper">
        <div className="comment__user-wrapper">
          <p className="comment__user">{comment.username}</p>
          <p className="comment__timestamp">{calcTime(comment.updated_at)}</p>
        </div>

        <form onSubmit={handleSubmit} className="comment__edit-form">
          <input
            name="comment"
            onChange={handleChange}
            type="text"
            className="comment__edit-input"
            value={formFields.comment}
          />

          {errorMessage && <p className="comments__error">{errorMessage}</p>}
          <button type="submit" className="comment__edit">
            Confirm edit
          </button>
        </form>
      </article>
    );
  }

  return (
    <article key={comment.id} className="comment__wrapper">
      <div className="comment__user-wrapper">
        <p className="comment__user">{comment.username}</p>
        <p className="comment__timestamp">{calcTime(comment.updated_at)}</p>
      </div>
      <p className="comment">{comment.comment}</p>

      {edit && (
        <button onClick={() => setIsEditing(true)} className="comment__edit">
          Edit your comment
        </button>
      )}
    </article>
  );
};

export default CommentCard;
