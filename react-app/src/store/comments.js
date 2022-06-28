const VIEW_COMMENTS = "comments/VIEW_COMMENTS"

const view = (comments) => ({
    type: VIEW_COMMENTS,
    comments,
})

export const viewComments = () => async (dispatch) => {
    const response = await fetch("/api/comments")

    if (response.ok) {
        const comments = await response.json()
        dispatch(view(comments))
    }
}

const commentsReducer = (state = {}, action) => {
    switch (action.type) {
        case VIEW_COMMENTS:
            const normalizedComments = {}
            action.comments.comments.forEach((comment) => {
                normalizedComments[comment.id] = comment
            })
            return { ...normalizedComments }
        default:
            return state
    }
}

export default commentsReducer
