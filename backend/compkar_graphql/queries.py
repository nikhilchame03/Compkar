import graphene
from graphene_django import DjangoObjectType

from questions.models import Attempt, DailyQuestion, Question, Subject, Topic


class SubjectType(DjangoObjectType):
    class Meta:
        model = Subject
        fields = "__all__"


class TopicType(DjangoObjectType):
    class Meta:
        model = Topic
        fields = "__all__"


class QuestionType(DjangoObjectType):
    class Meta:
        model = Question
        fields = "__all__"


class DailyQuestionType(DjangoObjectType):
    class Meta:
        model = DailyQuestion
        fields = "__all__"


class AttemptType(DjangoObjectType):
    class Meta:
        model = Attempt
        fields = "__all__"


class Query(graphene.ObjectType):
    subjects = graphene.List(SubjectType)
    subject = graphene.Field(SubjectType, id=graphene.Int(required=True))

    topics = graphene.List(TopicType)
    topic = graphene.Field(TopicType, id=graphene.Int(required=True))

    questions = graphene.List(QuestionType)
    question = graphene.Field(QuestionType, id=graphene.Int(required=True))
    question_by_serial = graphene.Field(QuestionType, serial=graphene.Int(required=True))

    daily_questions = graphene.List(DailyQuestionType)
    daily_question = graphene.Field(DailyQuestionType, id=graphene.Int(required=True))

    attempts = graphene.List(AttemptType)
    attempt = graphene.Field(AttemptType, id=graphene.Int(required=True))

    def resolve_subjects(self, info):
        return Subject.objects.all()

    def resolve_subject(self, info, id):
        return Subject.objects.filter(id=id).first()

    def resolve_topics(self, info):
        return Topic.objects.select_related("subject").all()

    def resolve_topic(self, info, id):
        return Topic.objects.filter(id=id).select_related("subject").first()

    def resolve_questions(self, info):
        return Question.objects.select_related("subject", "topic", "created_by").all()

    def resolve_question(self, info, id):
        return Question.objects.filter(id=id).select_related("subject", "topic", "created_by").first()

    def resolve_question_by_serial(self, info, serial):
        return Question.objects.filter(serial_number=serial).select_related("subject", "topic", "created_by").first()

    def resolve_daily_questions(self, info):
        return DailyQuestion.objects.select_related("question").all()

    def resolve_daily_question(self, info, id):
        return DailyQuestion.objects.filter(id=id).select_related("question").first()

    def resolve_attempts(self, info):
        return Attempt.objects.select_related("user", "question").all()

    def resolve_attempt(self, info, id):
        return Attempt.objects.filter(id=id).select_related("user", "question").first()
