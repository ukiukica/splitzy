from flask import Blueprint, request
from app.models import db, Bill, User
from app.models.bill import user_bills
from app.forms import BillForm, EditBillForm
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
    # bills = Bill.query.join(user_bills).join(User).filter((user_bills.c.bill_id == Bill.id) & (user_bills.c.user_id == User.id)).all()
    print("returned bills: ", [bill.to_dict() for bill in bills])
    return {'bills': [bill.to_dict() for bill in bills]}

@bill_routes.route('/user-bills/<int:id>')
def get_user_bill(id):
    bill = Bill.query.get(id)
    assigned_users = bill.assigned_user_bills[0:]
    # user_bills = [bill.assigned_user_bills for bill in bills]
    # user_bills = list(bills)[0].assigned_user_bills.all()
    # print("USER_BILLS: ", list(user_bill for user_bill in user_bills))
    print("LOOK FOR THIS: ", [assigned_user for assigned_user in assigned_users])
    return {'user_bills': [assigned_user.username for assigned_user in assigned_users]}

@bill_routes.route('/createbill', methods=['POST'])
def post_bill():
    form = BillForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        print("DATA: ", data)
        new_bill = Bill(label=data['label'],
                        amount=data['amount'],
                        created_at=datetime.now(),
                        updated_at=datetime.now())
        db.session.add(new_bill)
        db.session.commit()
        user_id = data['user_id']
        user = User.query.get(user_id)
        # print("USER_ID: ", user.id)
        bill_made = Bill.query.order_by(Bill.id.desc()).first()
        # print("BILL MADE: ", bill_made.id)
        bill_made.assign_bill_to_user(user)
        db.session.commit()
        return new_bill.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@bill_routes.route('/<int:id>', methods=['PUT'])
def edit_bill(id):
    bill = Bill.query.get(id)
    form = EditBillForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        bill.label=data['label']
        bill.amount=data['amount']
        bill.updated_at=datetime.now()

        db.session.commit()
        return bill.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@bill_routes.route('/<int:id>', methods=['DELETE'])
def delete_bill(id):
    bill = Bill.query.get(id)
    db.session.delete(bill)
    db.session.commit()

    return "Bill was successfully deleted."

@bill_routes.route('/add-bill-friends/<int:id>')
def add_bill_friends(id):
    bill_made = Bill.query.order_by(Bill.id.desc()).first()
    friend = User.query.get(id)
    bill_made.assign_bill_to_user(friend)
    db.session.commit()
    return "Friend was added to bill"

@bill_routes.route('/<int:id1>/remove-bill-friend/<int:id2>')
def remove_bill_friend(id1, id2):
    print("INSIDE REMOVE BILL FRIEND ROUTE")
    bill = Bill.query.get(id1)
    print("------------------------BILL--------", bill)
    friend = User.query.get(id2)
    bill.remove_bill_from_user(friend)
    db.session.commit()
    return "Friend was removed from bill"
