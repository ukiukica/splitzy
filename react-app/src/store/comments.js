const VIEW_COMMENTS = "comments/VIEW_COMMENTS"
const ADD_COMMENT = 'comments/ADD_COMMENT'
const EDIT_COMMENT = 'comments/EDIT_COMMENT'
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT'

const view = (comments) => ({
    type: VIEW_COMMENTS,
    comments,
})

const create = (newComment) => ({
    type: ADD_COMMENT,
    newComment
})

const edit = (editedComment) => ({
    type: EDIT_COMMENT,
    editedComment
})

const remove = (removedComment) => ({
    type: REMOVE_COMMENT,
    removedComment
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

export const editComment = (payload, id) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        dispatch(remove(id));
    }

    return response
}

export const removeComment = (id) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE'
    })
    console.log('RESPONSE', response)
    if (response.ok) {
        const removedComment = await response.json()
        dispatch(remove(removedComment))
        return removedComment
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
        case ADD_COMMENT:
            const addState = { ...state, [action.newComment.id]: action.newComment }
            return addState
        case REMOVE_COMMENT:
            const deleteState = {...state}
            delete deleteState[action.removedComment]
            return deleteState
        default:
            return state
    }
}

export default commentsReducer
