import graphene
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.core.exceptions import ValidationError
from graphql import GraphQLError

from .queries import UserType

User = get_user_model()


class CreateUser(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    user = graphene.Field(UserType)

    def mutate(self, info, email, password):
        if not email:
            raise GraphQLError('Email is required.')
        if not password or len(password) < 8:
            raise GraphQLError('Password must be at least 8 characters long.')
        
        try:
            user = User.objects.create_user(email=email, password=password)
        except ValidationError as e:
            raise GraphQLError(str(e))
        except Exception as e:
            raise GraphQLError('An error occurred while creating the user.')
        
        return CreateUser(user=user)


class Login(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    user = graphene.Field(UserType)

    def mutate(self, info, email, password):
        user = authenticate(info.context, username=email, password=password)
        if user is not None:
            login(info.context, user)
            return Login(user=user)
        else:
            raise GraphQLError('Invalid credentials.')


class Logout(graphene.Mutation):
    ok = graphene.Boolean()

    def mutate(self, info):
        logout(info.context)
        return Logout(ok=True)


class AuthMutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    login = Login.Field()
    logout = Logout.Field()
