from flask import Blueprint
from app.models import db, User

friend_routes = Blueprint('friends', __name__)


@friend_routes.route('/<int:id>')
def get_friends(id):
    user = User.query.get(id)
    friends = user.friended[0:]
    return {'friends': [friend.username for friend in friends]}

@friend_routes.route('/<int:id1>/add/<int:id2>')
def befriend_user(id1,id2):
    user = User.query.get(id1)
    new_friend = User.query.get(id2)
    print('USER -->', user)
    print('NEW FRIEND --->', new_friend)
    print('IS FRIEND--->', user.is_friend(new_friend))
    user.befriend(new_friend)
    db.session.commit()
    print('IS FRIEND--->', user.is_friend(new_friend))
    return "Friend successfully added"


@friend_routes.route('/<int:id>', methods=['DELETE'])
def delete_friends():
    pass
