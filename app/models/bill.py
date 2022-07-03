from .db import db


user_bills = db.Table(
    "user_bills",
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('bill_id', db.Integer, db.ForeignKey('bills.id'), primary_key=True),
)

class Bill(db.Model):
    __tablename__ = "bills"

    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    comments = db.relationship("Comment", back_populates="bills", cascade="all, delete")

    transactions = db.relationship("Transaction", back_populates="bills")

    assigned_user_bills = db.relationship("User",
        secondary=user_bills,
        backref= db.backref('user_bills', lazy = 'dynamic'),
        lazy = 'dynamic',
        cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'label': self.label,
            'amount': self.amount,
            'created_at': self.created_at,
            'updated_at': self.updated_at
    }

    def assign_bill_to_user(self, user):
        # if not self.is_assigned(user):
        self.assigned_user_bills.append(user)
        return self

    def remove_bill_from_user(self, user):
        # if not self.is_assigned(user):
        self.assigned_user_bills.remove(user)
        return self



    # def is_assigned(self, user):
    #     return self.assigned_user_bills.filter(user_bills.c.user_id == user.id).count() > 0
