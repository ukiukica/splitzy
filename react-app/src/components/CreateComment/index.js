import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import { addComment } from '../../store/comments'

function CreateComment() {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user)

    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
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
            bill_id: 1, /* for testing only, refactor this */
            content
        }
        let createdComment = await dispatch(addComment(payload))
        console.log("createdComment:", createdComment)
        if (createdComment) {
            setErrors([])
            return history.push('/comments')
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1> Add a Comment</h1>
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
            <button>Cancel</button>
        </div>
    )
}

export default CreateComment