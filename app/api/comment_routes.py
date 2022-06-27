from flask import Blueprint
from app.models import Comment

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/')
def comments():
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}

@comment_routes.route('/', methods=['POST'])
def post_comment():
    pass

@comment_routes.route('/<int:id>', methods=['PUT'])
def edit_comment():
    pass

@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment():
    pass
