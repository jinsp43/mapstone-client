import "./CommentCard.scss";

const CommentCard = ({ comment }) => {
  return (
    <article key={comment.id} className="comment__wrapper">
      <p className="comment__user">{comment.username}</p>
      <p className="comment">{comment.comment}</p>
    </article>
  );
};

export default CommentCard;
