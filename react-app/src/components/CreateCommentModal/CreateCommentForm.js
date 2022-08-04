import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addComment, viewComments } from "../../store/comments";

function CreateCommentForm({ billId }) {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    const errors = [];
    if (content.length > 2000) {
      errors.push("Comment must be less than 2000 characters.");
    }
    if (!content.length) {
      errors.push("Content is required.")
    }

    setErrors(errors);
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.length) {
      setShowErrors(true);
      return;
    }

    const payload = {
      user_id: sessionUser.id,
      bill_id: billId,
      content,
    };
    await dispatch(addComment(payload));
    setErrors([]);
    setContent("");
    await dispatch(viewComments())

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          {showErrors && (
          <div>
            {errors.map((error, idx) => (
              <p className="errors-p" key={idx}>
                {error}
              </p>
            ))}
          </div>
        )}
        <div className="add-cmt-submit-cancel-btns-div">
          <button className="add-cmt-submit-btn" type="submit">Post</button>
        </div>
      </form>
    </div>
  );
}

export default CreateCommentForm;
