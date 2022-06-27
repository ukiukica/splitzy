"""create bills table

Revision ID: 257ecec2dbb5
Revises: d1059cfa3828
Create Date: 2022-06-27 13:18:04.204921

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '257ecec2dbb5'
down_revision = 'd1059cfa3828'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bills',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('label', sa.String(length=100), nullable=False),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.Column('settled', sa.Boolean(create_constraint='false'), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_bills',
    sa.Column('users', sa.Integer(), nullable=True),
    sa.Column('bills', sa.Integer(), nullable=True),
    sa.Column('amount', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['bills'], ['bills.id'], ),
    sa.ForeignKeyConstraint(['users'], ['users.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_bills')
    op.drop_table('bills')
    # ### end Alembic commands ###