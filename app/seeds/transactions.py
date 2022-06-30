from app.models import db, Transaction

def seed_transactions():
    transaction_1 = Transaction(
        user_id=1, bill_id=1, user_amount= 62.50, settled= False, created_at= '2019-04-14', updated_at= '2019-04-14')
    transaction_2 = Transaction(
        user_id=2, bill_id=1, user_amount= 62.50, settled= False, created_at= '2019-04-14', updated_at= '2019-04-14')
    transaction_3 = Transaction(
        user_id=2, bill_id=2, user_amount= 1108.65, settled= False, created_at= '2019-04-14', updated_at= '2019-04-14')
    transaction_4 = Transaction(
        user_id=3, bill_id=2, user_amount= 1108.65, settled= False, created_at= '2019-04-14', updated_at= '2019-04-14')
    transaction_5 = Transaction(
        user_id=4, bill_id=2, user_amount= 1108.70, settled= False, created_at= '2019-04-14', updated_at= '2019-04-14')
    transaction_6 = Transaction(
        user_id=5, bill_id=3, user_amount= 42, settled= False, created_at= '2019-04-15', updated_at= '2019-04-15')
    transaction_7 = Transaction(
        user_id=6, bill_id=3, user_amount= 42, settled= False, created_at= '2019-04-15', updated_at= '2019-04-15')
    transaction_8 = Transaction(
        user_id=7, bill_id=4, user_amount= 184.33, settled= False, created_at= '2019-04-15', updated_at= '2019-04-15' )
    transaction_9 = Transaction(
        user_id=8, bill_id=4, user_amount= 184.33, settled= False, created_at= '2019-04-15', updated_at= '2019-04-15' )
    transaction_10 = Transaction(
        user_id=9, bill_id=4, user_amount= 184.34, settled= False, created_at= '2019-04-15', updated_at= '2019-04-15' )
    transaction_11 = Transaction(
        user_id=6, bill_id=5, user_amount= 445, settled= False, created_at= '2019-04-18', updated_at= '2019-04-18' )
    transaction_12 = Transaction(
        user_id=7, bill_id=5, user_amount= 445, settled= False, created_at= '2019-04-18', updated_at= '2019-04-18')
    transaction_13 = Transaction(
        user_id=2, bill_id=5, user_amount= 445, settled= False, created_at= '2019-04-18', updated_at= '2019-04-18')
    transaction_14 = Transaction(
        user_id=1, bill_id=6, user_amount= 10, settled= False, created_at= '2017-04-25', updated_at= '2017-04-25')
    transaction_15 = Transaction(
        user_id=3, bill_id=6, user_amount= 10, settled= False, created_at= '2017-04-25', updated_at= '2017-04-25')
    transaction_16 = Transaction(
        user_id=6, bill_id=7, user_amount= 1050, settled= False, created_at= '2018-04-29', updated_at= '2018-04-29')
    transaction_17 = Transaction(
        user_id=7, bill_id=7, user_amount= 1050, settled= False, created_at= '2018-04-29', updated_at= '2018-04-29')
    transaction_18 = Transaction(
        user_id=9, bill_id=8, user_amount= 160, settled= False, created_at= '2018-06-03', updated_at= '2018-06-03')
    transaction_19 = Transaction(
        user_id=10, bill_id=8, user_amount= 160, settled= False, created_at= '2018-06-03', updated_at= '2018-06-03')
    transaction_20 = Transaction(
        user_id=8, bill_id=9, user_amount= 260, settled= False, created_at= '2019-04-12', updated_at= '2019-04-12')
    transaction_21 = Transaction(
        user_id=9, bill_id=9, user_amount= 260, settled= False, created_at= '2019-04-12', updated_at= '2019-04-12')
    transaction_22 = Transaction(
        user_id=2, bill_id=10, user_amount= 46, settled= False, created_at= '2018-10-20', updated_at= '2018-10-20')
    transaction_23 = Transaction(
        user_id=5, bill_id=10, user_amount= 46, settled= False, created_at= '2018-10-20', updated_at= '2018-10-20')



    db.session.add(transaction_1)
    db.session.add(transaction_2)
    db.session.add(transaction_3)
    db.session.add(transaction_4)
    db.session.add(transaction_5)
    db.session.add(transaction_6)
    db.session.add(transaction_7)
    db.session.add(transaction_8)
    db.session.add(transaction_9)
    db.session.add(transaction_10)
    db.session.add(transaction_11)
    db.session.add(transaction_12)
    db.session.add(transaction_13)
    db.session.add(transaction_14)
    db.session.add(transaction_15)
    db.session.add(transaction_16)
    db.session.add(transaction_17)
    db.session.add(transaction_18)
    db.session.add(transaction_19)
    db.session.add(transaction_20)
    db.session.add(transaction_21)
    db.session.add(transaction_22)
    db.session.add(transaction_23)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
