import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addComment } from "../../store/comments";

function CreateCommentForm({ billId, setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (content.length > 2000) {
      errors.push("Comment must be less than 2000 characters");
    }

    setErrors(errors);
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user_id: sessionUser.id,
      bill_id: billId,
      content,
    };
    let createdComment = await dispatch(addComment(payload));
    console.log("createdComment:", createdComment);
    if (createdComment) {
      setErrors([]);
      setShowModal(false);
      return history.push("/bills");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <h1 id="add-cmt-title"> Add a Comment</h1>
          <div className="add-cmt-content-div">
          <input
            name="content"
            type="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          </div>
        <div className="add-cmt-submit-cancel-btns-div">
          <button id="add-cmt-submit-btn" disabled={content.length < 1} type="submit">Submit</button>
          <button id="add-cmt-cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default CreateCommentForm;
