const VIEW_COMMENTS = "comments/VIEW_COMMENTS"
const ADD_COMMENT = 'comments/ADD_COMMENT'

const view = (comments) => ({
    type: VIEW_COMMENTS,
    comments,
})

const create = (newComment) => ({
    type: ADD_COMMENT,
    newComment
})

export const viewComments = () => async (dispatch) => {
    const response = await fetch("/api/comments")

    if (response.ok) {
        const comments = await response.json()
        dispatch(view(comments))
    }
}

export const addComment = (payload) => async (dispatch) => {
    const response = await fetch("/api/comments/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })
    const newComment = await response.json()

    if (newComment) {
        dispatch(create(newComment))
    }
    return newComment
}

const commentsReducer = (state = {}, action) => {
    switch (action.type) {
        case VIEW_COMMENTS:
            const normalizedComments = {}
            action.comments.comments.forEach((comment) => {
                normalizedComments[comment.id] = comment
            })
            return { ...normalizedComments }
        case ADD_COMMENT:
            const addState = { ...state, [action.newComment.id]: action.newComment }
            return addState
        default:
            return state
    }
}

export default commentsReducer
