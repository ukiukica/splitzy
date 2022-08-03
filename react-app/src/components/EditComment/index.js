import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { editComment } from "../../store/comments";
import DeleteComment from "../DeleteComment";
import '../CreateCommentModal/CreateCommentButton.css'

function EditComment({ comment, billId, setShowEdit }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  const [content, setContent] = useState(comment.content);
  const [errors, setErrors] = useState([]);

  console.log("CONTENT --->", content);
  useEffect(() => {
    const errors = [];
    if (content.length > 2000) {
      errors.push("Comment must be less than 2000 characters");
    }
    if (content.length < 1) {
      errors.push("Comment must have content.");
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

    let editedComment = await dispatch(editComment(payload, comment.id));

    if (editedComment) {
      setErrors([]);
      setShowEdit(false)

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
            className='edit-comment-textarea'
            name="content"
            type="textarea"
            placeholder="Type something here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        {/* </div> */}
        <div className="add-cmt-submit-cancel-btns-div">
          <button className="add-cmt-submit-btn" type="submit">Submit</button>
          <DeleteComment comment={comment} />
        </div>
      </form>
    </div>
  );
}

export default EditComment;
