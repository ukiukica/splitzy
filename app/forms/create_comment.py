from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, SubmitField, TextAreaField
from sqlalchemy import DateTime
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    user_id = IntegerField("User_Id")
    bill_id = IntegerField("Bill_Id")
    content = TextAreaField('Content', validators=[DataRequired()])
    created_at = DateTime('created_at')
    updated_at = DateTime('updated_at')
    submit = SubmitField('Submit')
