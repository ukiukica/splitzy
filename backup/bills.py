from app.models import db, Bill


def seed_bills():
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

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_bills():
    db.session.execute('TRUNCATE bills RESTART IDENTITY CASCADE;')
    db.session.commit()
