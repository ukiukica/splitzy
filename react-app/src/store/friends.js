const VIEW_FRIENDS = "friends/VIEW_FRIENDS";

const view = (friends) => ({
  type: VIEW_FRIENDS,
  friends,
});

export const viewFriends = (friendId) => async (dispatch) => {
  const response = await fetch(`/api/friends/${friendId}`);

  if (response.ok) {
    const friends = await response.json();
    console.log(friends);
    dispatch(view(friends));
  }
};

const friendsReducer = (state = {}, action) => {
    switch (action.type) {
      case VIEW_FRIENDS:
        const normalizedFriends = {};
        action.friends.friends.forEach((friend) => {
          normalizedFriends[friend.id] = friend;
        });
        return { ...normalizedFriends };
      default:
        return state;
    }
  };

export default friendsReducer;
