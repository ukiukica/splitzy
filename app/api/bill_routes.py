from flask import Blueprint
from app.models import db, Bill
from app.forms import BillForm
from sqlalchemy import DateTime

bill_routes = Blueprint('bills', __name__)


@bill_routes.route('/')
def bills():
    bills = Bill.query.all()
    return {'bills': [bill.to_dict() for bill in bills]}

@bill_routes.route('/', methods=['POST'])
def post_bill():
    form = BillForm()
    if form.validate_on_submit():
        data = form.data
        new_bill = Bill(label=data['label'],
                        amount=data['amount'],
                        settled=data['settled'],
                        created_at=datetime.datetime.now(),
                        updated_at=datetime.datetime.now())
        db.session.add(new_bill)
        db.session.commit()
        return new_bill.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@bill_routes.route('/<int:id>', methods=['PUT'])
def edit_bill():
    pass

@bill_routes.route('/<int:id>', methods=['DELETE'])
def delete_bill():
    pass
