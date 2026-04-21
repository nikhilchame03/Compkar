import graphene

from .admin_mutations import AdminMutation
from .auth_mutations import AuthMutation
from .user_mutations import UserMutation

class Mutation(AdminMutation, AuthMutation, UserMutation):
    pass
