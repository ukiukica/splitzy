from app.models import db, Comment


def seed_comments():
    comment_1 = Comment(
        user_id=2, bill_id=1, content= "awesome!", created_at= '2019-04-14', updated_at= '2019-04-14' )
    comment_2 = Comment(
        user_id=1, bill_id=1, content= "second that :)", created_at= '2019-04-14', updated_at= '2019-04-14' )
    comment_3 = Comment(
        user_id=4, bill_id=2, content= "never gonna forget this!", created_at= '2019-04-14', updated_at= '2019-04-14' )
    comment_4 = Comment(
        user_id=3, bill_id=2, content= "remember the shark", created_at= '2019-04-14', updated_at= '2019-04-14' )
    comment_5 = Comment(
        user_id=2, bill_id=2, content= "the shark!", created_at= '2019-04-14', updated_at= '2019-04-14' )
    comment_6 = Comment(
        user_id=6, bill_id=3, content= "hated the veggie burger", created_at= '2019-04-14', updated_at= '2019-04-14' )
    comment_7 = Comment(
        user_id=5, bill_id=3, content= "love you guys <3", created_at= '2019-04-14', updated_at= '2019-04-14' )
    comment_8 = Comment(
        user_id=8, bill_id=4, content= "love youuu", created_at= '2019-04-14', updated_at= '2019-04-14' )
    comment_9 = Comment(
        user_id=9, bill_id=4, content= "10 tears flew by", created_at= '2019-04-14', updated_at= '2019-04-14' )
    comment_10 = Comment(
        user_id=7, bill_id=4, content= "i'm still in school fml", created_at= '2019-04-14', updated_at= '2019-04-14' )
    comment_11 = Comment(
        user_id=7, bill_id=5, content= "done", created_at= '2019-04-14', updated_at= '2019-04-14' )
    comment_12 = Comment(
        user_id=6, bill_id=5, content= "done and done!", created_at= '2019-04-14', updated_at= '2019-04-14' )
    comment_13 = Comment(
        user_id=3, bill_id=6, content= "never fails", created_at= '2019-04-14', updated_at= '2019-04-14' )
    comment_14 = Comment(
        user_id=1, bill_id=6, content= "NEVER", created_at= '2019-04-14', updated_at= '2019-04-14' )
    comment_15 = Comment(
        user_id=7, bill_id=7, content= "best idea ever", created_at= '2019-04-14', updated_at= '2019-04-14' )
    comment_16 = Comment(
        user_id=6, bill_id=7, content= "innit", created_at= '2019-04-14', updated_at= '2019-04-14' )
    comment_17 = Comment(
        user_id=10, bill_id=8, content= "we have to go back", created_at= '2019-04-14', updated_at= '2019-04-14' )
    comment_18 = Comment(
        user_id=9, bill_id=8, content= "if anything those chicken wingsssss", created_at= '2019-04-14', updated_at= '2019-04-14' )
    comment_19 = Comment(
        user_id=9, bill_id=9, content= "girlll we needed this", created_at= '2019-04-14', updated_at= '2019-04-14' )
    comment_20 = Comment(
        user_id=8, bill_id=9, content= "you can convince me to do anything", created_at= '2019-04-14', updated_at= '2019-04-14' )
    comment_21 = Comment(
        user_id=5, bill_id=10, content= "i got you next time", created_at= '2019-04-14', updated_at= '2019-04-14' )
    comment_22 = Comment(
        user_id=2, bill_id=10, content= "anything for you <3", created_at= '2019-04-14', updated_at= '2019-04-14' )



    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)
    db.session.add(comment_4)
    db.session.add(comment_5)
    db.session.add(comment_6)
    db.session.add(comment_7)
    db.session.add(comment_8)
    db.session.add(comment_9)
    db.session.add(comment_10)
    db.session.add(comment_11)
    db.session.add(comment_12)
    db.session.add(comment_13)
    db.session.add(comment_14)
    db.session.add(comment_15)
    db.session.add(comment_16)
    db.session.add(comment_17)
    db.session.add(comment_18)
    db.session.add(comment_19)
    db.session.add(comment_20)
    db.session.add(comment_21)
    db.session.add(comment_22)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
