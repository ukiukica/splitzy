from .db import db


user_bills = db.Table(
    "user_bills",
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('bill_id', db.Integer, db.ForeignKey('bills.id'), primary_key=True),
    db.Column('user_amount', db.Float)
)

class Bill(db.Model):
    __tablename__ = "bills"

    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    settled = db.Column(db.Boolean('false'))
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    comments = db.relationship("Comment", back_populates="bills")

    def to_dict(self):
        return {
            'id': self.id,
            'label': self.label,
            'amount': self.amount,
            'settled': self.settled,
            'created_at': self.created_at,
            'updated_at': self.updated_at
    }
