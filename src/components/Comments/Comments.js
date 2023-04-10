import { useState } from "react";
import CommentCard from "../CommentCard/CommentCard";
import "./Comments.scss";

const Comments = ({ comments, addComment }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const [formFields, setFormFields] = useState({
    comment: "",
  });

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
    } catch (error) {
      console.log(error.response);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <section className="comments">
      <h4 className="comments__heading">Comments ({comments.length})</h4>

      <form onSubmit={handleSubmit} className="comments__form">
        <input
          onChange={handleChange}
          className="comments__input"
          name="comment"
          type="text"
          placeholder="Type your comment..."
        />

        {errorMessage && <p className="comments__error">{errorMessage}</p>}

        <div className="comments__buttons">
          <button className="comments__cancel" type="button">
            Cancel
          </button>
          <button className="comments__submit" type="submit">
            Comment
          </button>
        </div>
      </form>
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </section>
  );
};

export default Comments;
