from .db import db


class Transaction(db.Model):
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    bill_id = db.Column(db.Integer, db.ForeignKey('bills.id'), nullable=False)
    user_amount = db.Column('user_amount', db.Float)
    settled = db.Column(db.Boolean('false'))
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    users = db.relationship("User", back_populates="users")
    bills = db.relationship("Bill", back_populates="bills")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'bill_id': self.bill_id,
            'user_amount': self.user_amount,
            'settled': self.settled,
            'created_at': self.created_at,
            'updated_at': self.updated_at
    }
