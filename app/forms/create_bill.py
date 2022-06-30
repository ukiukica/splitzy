from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, FloatField, SubmitField
from sqlalchemy import DateTime
from wtforms.validators import DataRequired

class BillForm(FlaskForm):
    label = StringField('Label', validators=[DataRequired()])
    amount = FloatField('Amount', validators=[DataRequired()])
    created_at = DateTime('created_at')
    updated_at = DateTime('updated_at')
    submit = SubmitField('Submit')
