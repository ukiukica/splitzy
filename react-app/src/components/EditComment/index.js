import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from 'react-router-dom'
import { editComment } from '../../store/comments'

function EditComment({ setShowModal, comment, billId }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user)

    const [content, setContent] = useState(comment.content)
    const [errors, setErrors] = useState([])

    console.log('CONTENT --->', content)
    useEffect(() => {
        const errors = []
        if (content.length > 2000) {
            errors.push('Comment must be less than 2000 characters')
        }
        if (content.length < 1) {
            errors.push('Comment must have content.')
        }
        setErrors(errors)
    }, [content])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            user_id: sessionUser.id,
            bill_id: billId,
            content
        }

        let editedComment = await dispatch(editComment(payload, comment.id))

        if (editedComment) {
            setErrors([])
            setShowModal(false)
            return history.push('/bills')
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1> Edit Comment</h1>
                <div>
                    <input
                        name='content'
                        type='textarea'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
            <button onClick={()=> setShowModal(false)}>Cancel</button>
        </div>
    )
}

export default EditComment
