from app.models import db, Bill, User


def seed_user_bills():
    user = User()
    bill = Bill()

    
#     user_bill_1 = Bill(
#         user_id=1, bill_id=1, user_amount= 62.50 )
#     user_bill_2 = Bill(
#         user_id=2, bill_id=1, user_amount= 62.50 )
#     user_bill_3 = Bill(
#         user_id=2, bill_id=2, user_amount= 1108.65 )
#     user_bill_4 = Bill(
#         user_id=3, bill_id=2, user_amount= 1108.65 )
#     user_bill_5 = Bill(
#         user_id=4, bill_id=2, user_amount= 1108.70 )
#     user_bill_6 = Bill(
#         user_id=5, bill_id=3, user_amount= 42 )
#     user_bill_7 = Bill(
#         user_id=6, bill_id=3, user_amount= 42 )
#     user_bill_8 = Bill(
#         user_id=7, bill_id=4, user_amount= 184.33 )
#     user_bill_9 = Bill(
#         user_id=8, bill_id=4, user_amount= 184.33 )
#     user_bill_10 = Bill(
#         user_id=9, bill_id=4, user_amount= 184.34 )
#     user_bill_11 = Bill(
#         user_id=6, bill_id=5, user_amount= 445 )
#     user_bill_12 = Bill(
#         user_id=7, bill_id=5, user_amount= 445 )
#     user_bill_13 = Bill(
#         user_id=7, bill_id=5, user_amount= 445 )
#     user_bill_14 = Bill(
#         user_id=1, bill_id=6, user_amount= 10 )
#     user_bill_15 = Bill(
#         user_id=3, bill_id=6, user_amount= 10 )
#     user_bill_16 = Bill(
#         user_id=6, bill_id=7, user_amount= 1050 )
#     user_bill_17 = Bill(
#         user_id=7, bill_id=7, user_amount= 1050 )
#     user_bill_18 = Bill(
#         user_id=9, bill_id=8, user_amount= 160 )
#     user_bill_19 = Bill(
#         user_id=10, bill_id=8, user_amount= 160 )
#     user_bill_20 = Bill(
#         user_id=8, bill_id=9, user_amount= 260 )
#     user_bill_21 = Bill(
#         user_id=9, bill_id=9, user_amount= 260 )
#     user_bill_22 = Bill(
#         user_id=2, bill_id=10, user_amount= 46 )
#     user_bill_23 = Bill(
#         user_id=5, bill_id=10, user_amount= 46 )


#     db.session.add(user_bill_1)
#     db.session.add(user_bill_2)
#     db.session.add(user_bill_3)
#     db.session.add(user_bill_4)
#     db.session.add(user_bill_5)
#     db.session.add(user_bill_6)
#     db.session.add(user_bill_7)
#     db.session.add(user_bill_8)
#     db.session.add(user_bill_9)
#     db.session.add(user_bill_10)
#     db.session.add(user_bill_11)
#     db.session.add(user_bill_12)
#     db.session.add(user_bill_13)
#     db.session.add(user_bill_14)
#     db.session.add(user_bill_15)
#     db.session.add(user_bill_16)
#     db.session.add(user_bill_17)
#     db.session.add(user_bill_18)
#     db.session.add(user_bill_19)
#     db.session.add(user_bill_20)
#     db.session.add(user_bill_21)
#     db.session.add(user_bill_22)
#     db.session.add(user_bill_23)


#     db.session.commit()


# # Uses a raw SQL query to TRUNCATE the users table.
# # SQLAlchemy doesn't have a built in function to do this
# # TRUNCATE Removes all the data from the table, and RESET IDENTITY
# # resets the auto incrementing primary key, CASCADE deletes any
# # dependent entities
# def undo_user_bills():
#     db.session.execute('TRUNCATE user_bills RESTART IDENTITY CASCADE;')
#     db.session.commit()
