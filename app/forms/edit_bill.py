from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, BooleanField, FloatField, SubmitField
from sqlalchemy import DateTime, Integer
from wtforms.validators import DataRequired

class EditBillForm(FlaskForm):
    id = IntegerField("Bill_id")
    label = StringField('Label', validators=[DataRequired()])
    amount = FloatField('Amount', validators=[DataRequired()])
    settled = BooleanField('Settled')
    created_at = DateTime('created_at')
    updated_at = DateTime('updated_at')
    submit = SubmitField('Submit')
