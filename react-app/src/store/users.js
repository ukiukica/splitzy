const VIEW_USERS = "users/VIEW_USERS";

const view = (users) => ({
    type: VIEW_USERS,
    users,
  });

  export const viewUsers = () => async (dispatch) => {
    const response = await fetch("/api/users/");

    if (response.ok) {
      const users = await response.json();
      dispatch(view(users));
    }
  };

  const usersReducer = (state = {}, action) => {
    switch (action.type) {
      case VIEW_USERS:
        const normalizedUsers = {};
        action.users.users.forEach((user) => {
          normalizedUsers[user.id] = user;
        });
        return { ...normalizedUsers };
      default:
        return state;
    }
  };

  export default usersReducer;
