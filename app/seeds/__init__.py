from flask.cli import AppGroup
from .users import seed_users, undo_users
from .bills import seed_bills, undo_bills
from .comments import seed_comments, undo_comments
# from .user_bills import seed_user_bills, undo_user_bills

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_bills()
    seed_comments()
    # seed_user_bills()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_bills()
    undo_comments()
    # undo_user_bills()
    # Add other undo functions here
