from flask import Blueprint, request
from app.forms.create_comment import CommentForm
from app.forms.edit_comment import EditCommentForm
from app.models import db, Comment
from datetime import datetime

comment_routes = Blueprint('comments', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@comment_routes.route('/')
def comments():
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}

@comment_routes.route('/new', methods=['POST'])
def post_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        print("FORM DATA:", data)
        new_comment = Comment(
            user_id=data['user_id'],
            bill_id=data['bill_id'],
            content=data['content'],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@comment_routes.route('/<int:id>', methods=['PUT'])
def edit_comment(id):
    comment = Comment.query.get(id)
    form = EditCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        comment.content = data['content']
        comment.updated_at = datetime.now()
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
