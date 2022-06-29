from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

friends = db.Table(
    'friends',
    db.Column('friend_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('friended_id', db.Integer, db.ForeignKey('users.id'))
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    hashed_password = db.Column(db.String(102), nullable=False)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    comments = db.relationship("Comment", back_populates="users")
    transactions = db.relationship("Transaction", back_populates="users")

    friended = db.relationship('User',
        secondary = friends,
        primaryjoin = (friends.c.friend_id == id),
        secondaryjoin = (friends.c.friended_id == id),
        backref = db.backref('friends', lazy = 'dynamic'),
        lazy = 'dynamic')

    def befriend(self, user):
        if not self.is_friend(user):
            self.friended.append(user)
            return self

    def unfriend(self, user):
        if self.is_friend(user):
            self.friended.remove(user)
            return self

    def is_friend(self, user):
        return self.friended.filter(friends.c.friended_id == user.id).count() > 0

    def friends_list(self):
        return User.query.join(friends, (friends.c.friend_id == self.id)).all()

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
