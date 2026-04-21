import graphene
from django.contrib.auth import get_user_model
from graphql import GraphQLError

from questions.models import Attempt

from .queries import AttemptType

User = get_user_model()

class CreateAttempt(graphene.Mutation):
    class Arguments:
        question_id = graphene.Int(required=True)
        selected_option = graphene.String(required=True)

    attempt = graphene.Field(AttemptType)

    def mutate(self, info, question_id, selected_option):
        user = info.context.user
        if not user.is_authenticated:
            raise GraphQLError('You must be logged in to perform this action.')
        attempt = Attempt.objects.create(user_id=user.id, question_id=question_id, selected_option=selected_option)
        return CreateAttempt(attempt=attempt)

class UpdateAttempt(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        question_id = graphene.Int()
        selected_option = graphene.String()

    attempt = graphene.Field(AttemptType)

    def mutate(self, info, id, question_id=None, selected_option=None):
        user = info.context.user
        if not user.is_authenticated:
            raise GraphQLError('You must be logged in to perform this action.')
        attempt = Attempt.objects.get(id=id, user_id=user.id)
        if question_id is not None:
            attempt.question_id = question_id
        if selected_option is not None:
            attempt.selected_option = selected_option
        attempt.save()
        return UpdateAttempt(attempt=attempt)

class DeleteAttempt(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    ok = graphene.Boolean()

    def mutate(self, info, id):
        user = info.context.user
        if not user.is_authenticated:
            raise GraphQLError('You must be logged in to perform this action.')
        deleted, _ = Attempt.objects.filter(id=id, user_id=user.id).delete()
        return DeleteAttempt(ok=deleted > 0)

class UserMutation(graphene.ObjectType):
    create_attempt = CreateAttempt.Field()
    update_attempt = UpdateAttempt.Field()
    delete_attempt = DeleteAttempt.Field()
