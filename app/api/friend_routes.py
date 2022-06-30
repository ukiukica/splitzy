from flask import Blueprint
from app.models import User

friend_routes = Blueprint('friends', __name__)


@friend_routes.route('/<int:id>')
def get_friends(id):
    user = User.query.get(id)
    friends = user.friended[0:]
    return {'friends': [friend.username for friend in friends]}

@friend_routes.route('/', methods=['POST'])
def post_friends():
    pass

@friend_routes.route('/<int:id>', methods=['DELETE'])
def delete_friends():
    pass
