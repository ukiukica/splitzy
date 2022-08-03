import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addComment, viewComments } from "../../store/comments";

function CreateCommentForm({ billId }) {
  const dispatch = useDispatch();

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
      setContent("");
      await dispatch(viewComments())
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
          {/* <div className="add-cmt-content-div"> */}
          <textarea
            className='comment-textarea'
            name="content"
            type="textarea"
            placeholder="Add a comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          {/* </div> */}
        <div className="add-cmt-submit-cancel-btns-div">
          <button className="add-cmt-submit-btn" disabled={content.length < 1} type="submit">Post</button>
        </div>
      </form>
    </div>
  );
}

export default CreateCommentForm;
