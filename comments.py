from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_comments():
    demo = User(
        first_name='Demo', last_name='Lition', username='demo', email='demo@aa.io', password='password', createdAt= '2019-04-14', updatedAt= '2019-04-14' )
    marnie = User(
        first_name='Marnie', last_name='Licious', username='marnie', email='marnie@aa.io', password='password', createdAt= '2019-04-14', updatedAt= '2019-04-14' )
    bobbie = User(
        first_name='Bobbie', last_name='Hill', username='bobbie', email='bobbie@aa.io', password='password', createdAt= '2019-04-15', updatedAt= '2019-04-15')
    john = User(
        first_name='John', last_name='Hinds', username='john', email='johnH@yahoo.com', password='password', createdAt= '2019-04-15', updatedAt= '2019-04-15')
    patrick = User(
        first_name='Patrick', last_name='Mcginn', username='patrick', email='patrickM@gmail.com', password='password', createdAt= '2019-04-18', updatedAt= '2019-04-18' )
    hala = User(
        first_name='Hala', last_name='Ljungman', username='hala', email='ali020587@ebarg.net', password='password', createdAt= '2017-04-25', updatedAt= '2017-04-25')
    ilker = User(
        first_name='Ilker', last_name='Koskinen', username='ilker', email='karmaissniping@dmxs8.com', password='password', createdAt= '2018-04-29', updatedAt= '2018-04-29')
    juanne = User(
        first_name='Juanne', last_name='Tinker', username='juanne', email='baywatch202@freeallapp.com', password='password', createdAt= '2018-06-03', updatedAt= '2018-06-03')
    kasi = User(
        first_name='Kasi', last_name='Hopkins', username='kasi', email='anipar@mailcuk.com', password='password', createdAt= '2019-04-12', updatedAt= '2019-04-12')
    esther = User(
        first_name='Esther', last_name='Debenham', username='esther', email='kaixx@bomukic.com', password='password', createdAt= '2018-10-20', updatedAt= '2018-10-20')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(john)
    db.session.add(patrick)
    db.session.add(hala)
    db.session.add(ilker)
    db.session.add(juanne)
    db.session.add(kasi)
    db.session.add(esther)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
