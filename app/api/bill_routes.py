from lib2to3.pygram import pattern_symbols
from flask import Blueprint
from app.models import Bill

bill_routes = Blueprint('bills', __name__)


@bill_routes.route('/')
def bills():
    bills = Bill.query.all()
    return {'bills': [bill.to_dict() for bill in bills]}

@bill_routes.route('/', methods=['POST'])
def post_bill():
    pass

@bill_routes.route('/<int:id>', methods=['PUT'])
def edit_bill():
    pass

@bill_routes.route('/<int:id>', methods=['DELETE'])
def delete_bill():
    pass
