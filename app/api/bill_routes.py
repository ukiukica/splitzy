from flask import Blueprint, Flask, request
from app.models import db, Bill
from app.forms import BillForm
from datetime import datetime


bill_routes = Blueprint('bills', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@bill_routes.route('/')
def bills():
    bills = Bill.query.all()
    return {'bills': [bill.to_dict() for bill in bills]}

@bill_routes.route('/createbill', methods=['POST'])
def post_bill():
    print("BILL POSTED")
    form = BillForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_bill = Bill(label=data['label'],
                        amount=data['amount'],
                        settled=data['settled'],
                        created_at=datetime.now(),
                        updated_at=datetime.now())
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
