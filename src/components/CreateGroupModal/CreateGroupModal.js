import { useState } from "react";
import { NEW_GROUP } from "../../utils/apiCalls.mjs";
import "./CreateGroupModal.scss";

const CreateGroupModal = ({
  show,
  getGroups,
  authToken,
  modalCloseHandler,
}) => {
  const [formFields, setFormFields] = useState({
    group_name: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formFields.group_name) {
      setErrorMessage("You must provide a group name");
      return;
    }

    try {
      await NEW_GROUP(formFields, authToken);
      getGroups();
    } catch (error) {
      console.log(error.response);
      setErrorMessage(error.response.data.message);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <article className="create-group-modal" onClick={modalCloseHandler}>
      <div
        className="create-group-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="create-group-modal__heading">Create A New Group</h3>

        <form onSubmit={handleSubmit} className="create-group-modal__form">
          <label htmlFor="group_name" className="create-group-modal__label">
            Group Name:
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="group_name"
            className="create-group-modal__input"
            placeholder="Enter Group Name..."
          />

          {errorMessage && (
            <p className="create-group-modal__error">{errorMessage}</p>
          )}
          <button className="create-group-modal__submit" type="submit">
            Create Group!
          </button>

          <button
            onClick={modalCloseHandler}
            className="create-group-modal__cancel"
            type="button"
          >
            Cancel
          </button>
        </form>
      </div>
    </article>
  );
};

export default CreateGroupModal;
