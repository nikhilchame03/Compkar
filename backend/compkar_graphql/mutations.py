import graphene

from questions.models import Attempt, DailyQuestion, Question, Subject, Topic

from .queries import AttemptType, DailyQuestionType, QuestionType, SubjectType, TopicType


class CreateSubject(graphene.Mutation):
    class Arguments:
        exam = graphene.String(required=True)
        name = graphene.String(required=True)

    subject = graphene.Field(SubjectType)

    def mutate(self, info, exam, name):
        subject = Subject.objects.create(exam=exam, name=name)
        return CreateSubject(subject=subject)


class UpdateSubject(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        exam = graphene.String()
        name = graphene.String()

    subject = graphene.Field(SubjectType)

    def mutate(self, info, id, exam=None, name=None):
        subject = Subject.objects.get(id=id)
        if exam is not None:
            subject.exam = exam
        if name is not None:
            subject.name = name
        subject.save()
        return UpdateSubject(subject=subject)


class DeleteSubject(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    ok = graphene.Boolean()

    def mutate(self, info, id):
        deleted, _ = Subject.objects.filter(id=id).delete()
        return DeleteSubject(ok=deleted > 0)


class CreateTopic(graphene.Mutation):
    class Arguments:
        subject_id = graphene.Int(required=True)
        name = graphene.String(required=True)

    topic = graphene.Field(TopicType)

    def mutate(self, info, subject_id, name):
        topic = Topic.objects.create(subject_id=subject_id, name=name)
        return CreateTopic(topic=topic)


class UpdateTopic(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        subject_id = graphene.Int()
        name = graphene.String()

    topic = graphene.Field(TopicType)

    def mutate(self, info, id, subject_id=None, name=None):
        topic = Topic.objects.get(id=id)
        if subject_id is not None:
            topic.subject_id = subject_id
        if name is not None:
            topic.name = name
        topic.save()
        return UpdateTopic(topic=topic)


class DeleteTopic(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    ok = graphene.Boolean()

    def mutate(self, info, id):
        deleted, _ = Topic.objects.filter(id=id).delete()
        return DeleteTopic(ok=deleted > 0)


class CreateQuestion(graphene.Mutation):
    class Arguments:
        exam = graphene.String(required=True)
        subject_id = graphene.Int(required=True)
        topic_id = graphene.Int(required=True)
        difficulty = graphene.String(required=True)
        title = graphene.String(required=True)
        statement = graphene.String(required=True)
        option_a = graphene.String(required=True)
        option_b = graphene.String(required=True)
        option_c = graphene.String(required=True)
        option_d = graphene.String(required=True)
        correct_option = graphene.String(required=True)
        explanation = graphene.String()
        source = graphene.String()
        is_published = graphene.Boolean()
        created_by_id = graphene.Int()

    question = graphene.Field(QuestionType)

    def mutate(
        self,
        info,
        exam,
        subject_id,
        topic_id,
        difficulty,
        title,
        statement,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_option,
        explanation="",
        source="",
        is_published=True,
        created_by_id=None,
    ):
        question = Question.objects.create(
            exam=exam,
            subject_id=subject_id,
            topic_id=topic_id,
            difficulty=difficulty,
            title=title,
            statement=statement,
            option_a=option_a,
            option_b=option_b,
            option_c=option_c,
            option_d=option_d,
            correct_option=correct_option,
            explanation=explanation,
            source=source,
            is_published=is_published,
            created_by_id=created_by_id,
        )
        return CreateQuestion(question=question)


class UpdateQuestion(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        exam = graphene.String()
        subject_id = graphene.Int()
        topic_id = graphene.Int()
        difficulty = graphene.String()
        title = graphene.String()
        statement = graphene.String()
        option_a = graphene.String()
        option_b = graphene.String()
        option_c = graphene.String()
        option_d = graphene.String()
        correct_option = graphene.String()
        explanation = graphene.String()
        source = graphene.String()
        is_published = graphene.Boolean()

    question = graphene.Field(QuestionType)

    def mutate(self, info, id, **kwargs):
        question = Question.objects.get(id=id)
        for key, value in kwargs.items():
            if value is not None:
                setattr(question, key, value)
        question.save()
        return UpdateQuestion(question=question)


class DeleteQuestion(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    ok = graphene.Boolean()

    def mutate(self, info, id):
        deleted, _ = Question.objects.filter(id=id).delete()
        return DeleteQuestion(ok=deleted > 0)


class CreateDailyQuestion(graphene.Mutation):
    class Arguments:
        date = graphene.Date(required=True)
        question_id = graphene.Int(required=True)

    daily_question = graphene.Field(DailyQuestionType)

    def mutate(self, info, date, question_id):
        daily_question = DailyQuestion.objects.create(date=date, question_id=question_id)
        return CreateDailyQuestion(daily_question=daily_question)


class UpdateDailyQuestion(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        date = graphene.Date()
        question_id = graphene.Int()

    daily_question = graphene.Field(DailyQuestionType)

    def mutate(self, info, id, date=None, question_id=None):
        daily_question = DailyQuestion.objects.get(id=id)
        if date is not None:
            daily_question.date = date
        if question_id is not None:
            daily_question.question_id = question_id
        daily_question.save()
        return UpdateDailyQuestion(daily_question=daily_question)


class DeleteDailyQuestion(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    ok = graphene.Boolean()

    def mutate(self, info, id):
        deleted, _ = DailyQuestion.objects.filter(id=id).delete()
        return DeleteDailyQuestion(ok=deleted > 0)


class CreateAttempt(graphene.Mutation):
    class Arguments:
        user_id = graphene.Int(required=True)
        question_id = graphene.Int(required=True)
        selected_option = graphene.String(required=True)

    attempt = graphene.Field(AttemptType)

    def mutate(self, info, user_id, question_id, selected_option):
        attempt = Attempt.objects.create(user_id=user_id, question_id=question_id, selected_option=selected_option)
        return CreateAttempt(attempt=attempt)


class UpdateAttempt(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        user_id = graphene.Int()
        question_id = graphene.Int()
        selected_option = graphene.String()

    attempt = graphene.Field(AttemptType)

    def mutate(self, info, id, user_id=None, question_id=None, selected_option=None):
        attempt = Attempt.objects.get(id=id)
        if user_id is not None:
            attempt.user_id = user_id
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
        deleted, _ = Attempt.objects.filter(id=id).delete()
        return DeleteAttempt(ok=deleted > 0)


class Mutation(graphene.ObjectType):
    create_subject = CreateSubject.Field()
    update_subject = UpdateSubject.Field()
    delete_subject = DeleteSubject.Field()

    create_topic = CreateTopic.Field()
    update_topic = UpdateTopic.Field()
    delete_topic = DeleteTopic.Field()

    create_question = CreateQuestion.Field()
    update_question = UpdateQuestion.Field()
    delete_question = DeleteQuestion.Field()

    create_daily_question = CreateDailyQuestion.Field()
    update_daily_question = UpdateDailyQuestion.Field()
    delete_daily_question = DeleteDailyQuestion.Field()

    create_attempt = CreateAttempt.Field()
    update_attempt = UpdateAttempt.Field()
    delete_attempt = DeleteAttempt.Field()
