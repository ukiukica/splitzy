# from app.models import db, Bill


# def seed_user_bills():
#     user_bill_1 = Bill(
#         users=1, bills=1, amount= 62.50 )
#     user_bill_2 = Bill(
#         users=2, bills=1, amount= 62.50 )
#     user_bill_3 = Bill(
#         users=2, bills=2, amount= 1108.65 )
#     user_bill_4 = Bill(
#         users=3, bills=2, amount= 1108.65 )
#     user_bill_5 = Bill(
#         users=4, bills=2, amount= 1108.70 )
#     user_bill_6 = Bill(
#         users=5, bills=3, amount= 42 )
#     user_bill_7 = Bill(
#         users=6, bills=3, amount= 42 )
#     user_bill_8 = Bill(
#         users=7, bills=4, amount= 184.33 )
#     user_bill_9 = Bill(
#         users=8, bills=4, amount= 184.33 )
#     user_bill_10 = Bill(
#         users=9, bills=4, amount= 184.34 )
#     user_bill_11 = Bill(
#         users=6, bills=5, amount= 445 )
#     user_bill_12 = Bill(
#         users=7, bills=5, amount= 445 )
#     user_bill_13 = Bill(
#         users=7, bills=5, amount= 445 )
#     user_bill_14 = Bill(
#         users=1, bills=6, amount= 10 )
#     user_bill_15 = Bill(
#         users=3, bills=6, amount= 10 )
#     user_bill_16 = Bill(
#         users=6, bills=7, amount= 1050 )
#     user_bill_17 = Bill(
#         users=7, bills=7, amount= 1050 )
#     user_bill_18 = Bill(
#         users=9, bills=8, amount= 160 )
#     user_bill_19 = Bill(
#         users=10, bills=8, amount= 160 )
#     user_bill_20 = Bill(
#         users=8, bills=9, amount= 260 )
#     user_bill_21 = Bill(
#         users=9, bills=9, amount= 260 )
#     user_bill_22 = Bill(
#         users=2, bills=10, amount= 46 )
#     user_bill_23 = Bill(
#         users=5, bills=10, amount= 46 )


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
