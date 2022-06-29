import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewComments } from '../../store/comments'
import EditComment from '../EditComment'
import DeleteComment from '../DeleteComment'

function Comments() {
    const dispatch = useDispatch()

    const comments = useSelector((state) => {
        return Object.values(state.comments)
    })

    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(viewComments())
    }, [dispatch])

    return (
        <div>
            {comments.map((comment) =>(
                <div key={comment.id}>
                    <p>{comment.content}</p>
                    {(sessionUser.id == comment.user_id) ? (
                        <div>
                            <EditComment comment={comment} />
                            <DeleteComment comment={comment} />
                        </div>
                    ) : null }
                </div>
            ))}
        </div>
    )

}

export default Comments
