from app.models import db, User
from app.models import db, Bill


# Adds a demo user, you can add other users here if you want
def seed_users_and_bills():
    user_1 = User(
        first_name='Demo', last_name='Lition', username='demo', email='demo@aa.io', password='password', created_at= '2019-04-14', updated_at= '2019-04-14' )
    user_2 = User(
        first_name='Marnie', last_name='Licious', username='marnie', email='marnie@aa.io', password='password', created_at= '2019-04-14', updated_at= '2019-04-14' )
    user_3 = User(
        first_name='Bobbie', last_name='Hill', username='bobbie', email='bobbie@aa.io', password='password', created_at= '2019-04-15', updated_at= '2019-04-15')
    user_4 = User(
        first_name='John', last_name='Hinds', username='john', email='johnH@yahoo.com', password='password', created_at= '2019-04-15', updated_at= '2019-04-15')
    user_5 = User(
        first_name='Patrick', last_name='Mcginn', username='patrick', email='patrickM@gmail.com', password='password', created_at= '2019-04-18', updated_at= '2019-04-18' )
    user_6 = User(
        first_name='Hala', last_name='Ljungman', username='hala', email='ali020587@ebarg.net', password='password', created_at= '2017-04-25', updated_at= '2017-04-25')
    user_7 = User(
        first_name='Ilker', last_name='Koskinen', username='ilker', email='karmaissniping@dmxs8.com', password='password', created_at= '2018-04-29', updated_at= '2018-04-29')
    user_8 = User(
        first_name='Juanne', last_name='Tinker', username='juanne', email='baywatch202@freeallapp.com', password='password', created_at= '2018-06-03', updated_at= '2018-06-03')
    user_9 = User(
        first_name='Kasi', last_name='Hopkins', username='kasi', email='anipar@mailcuk.com', password='password', created_at= '2019-04-12', updated_at= '2019-04-12')
    user_10 = User(
        first_name='Esther', last_name='Debenham', username='esther', email='kaixx@bomukic.com', password='password', created_at= '2018-10-20', updated_at= '2018-10-20')

    db.session.add(user_1)
    db.session.add(user_2)
    db.session.add(user_3)
    db.session.add(user_4)
    db.session.add(user_5)
    db.session.add(user_6)
    db.session.add(user_7)
    db.session.add(user_8)
    db.session.add(user_9)
    db.session.add(user_10)


    bill_1 = Bill(
        label='Date Night', amount=125, created_at= '2019-04-14', updated_at= '2019-04-14' )
    bill_2 = Bill(
        label="Summer '19", amount=3326, created_at= '2019-04-14', updated_at= '2019-04-14' )
    bill_3 = Bill(
        label="Bob's Burgers", amount=84, created_at= '2019-04-15', updated_at= '2019-04-15')
    bill_4 = Bill(
        label='Reunion', amount=553, created_at= '2019-04-15', updated_at= '2019-04-15')
    bill_5 = Bill(
        label='Utilities, October 2019', amount=1335, created_at= '2019-04-18', updated_at= '2019-04-18' )
    bill_6 = Bill(
        label="Mc Donald's", amount=20, created_at= '2017-04-25', updated_at= '2017-04-25')
    bill_7 = Bill(
        label='Furniture', amount=2100, created_at= '2018-04-29', updated_at= '2018-04-29')
    bill_8 = Bill(
        label='Dinner at Chix', amount=320, created_at= '2018-06-03', updated_at= '2018-06-03')
    bill_9 = Bill(
        label='Wardrobe Makeover', amount=520, created_at= '2019-04-12', updated_at= '2019-04-12')
    bill_10 = Bill(
        label='Pharmacy Run', amount=92, created_at= '2018-10-20', updated_at= '2018-10-20')


    db.session.add(bill_1)
    db.session.add(bill_2)
    db.session.add(bill_3)
    db.session.add(bill_4)
    db.session.add(bill_5)
    db.session.add(bill_6)
    db.session.add(bill_7)
    db.session.add(bill_8)
    db.session.add(bill_9)
    db.session.add(bill_10)



    bill_1.assign_bill_to_user(user_1)
    bill_1.assign_bill_to_user(user_2)
    bill_2.assign_bill_to_user(user_2)
    bill_2.assign_bill_to_user(user_3)
    bill_2.assign_bill_to_user(user_4)
    bill_3.assign_bill_to_user(user_5)
    bill_3.assign_bill_to_user(user_6)
    bill_4.assign_bill_to_user(user_7)
    bill_4.assign_bill_to_user(user_8)
    bill_4.assign_bill_to_user(user_9)
    bill_5.assign_bill_to_user(user_6)
    bill_5.assign_bill_to_user(user_7)
    bill_5.assign_bill_to_user(user_2)
    bill_6.assign_bill_to_user(user_1)
    bill_6.assign_bill_to_user(user_3)
    bill_7.assign_bill_to_user(user_6)
    bill_7.assign_bill_to_user(user_7)
    bill_8.assign_bill_to_user(user_9)
    bill_8.assign_bill_to_user(user_10)
    bill_9.assign_bill_to_user(user_8)
    bill_9.assign_bill_to_user(user_9)
    bill_10.assign_bill_to_user(user_2)
    bill_10.assign_bill_to_user(user_5)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users_and_bills():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE bills RESTART IDENTITY CASCADE;')
    db.session.commit()
