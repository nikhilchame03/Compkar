from django.contrib import admin
from .models import Attempt, DailyQuestion, Question, Subject, Topic


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
	list_display = ("name", "exam")
	list_filter = ("exam",)
	search_fields = ("name",)


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
	list_display = ("name", "subject")
	list_filter = ("subject__exam", "subject")
	search_fields = ("name", "subject__name")


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
	list_display = ("title", "exam", "subject", "topic", "difficulty", "is_published")
	list_filter = ("exam", "difficulty", "is_published", "subject", "topic")
	search_fields = ("title", "statement", "source")


@admin.register(DailyQuestion)
class DailyQuestionAdmin(admin.ModelAdmin):
	list_display = ("date", "question")
	search_fields = ("question__title",)


@admin.register(Attempt)
class AttemptAdmin(admin.ModelAdmin):
	list_display = ("user", "question", "selected_option", "is_correct", "attempted_at")
	list_filter = ("is_correct", "question__exam", "question__subject")
	search_fields = ("user__email", "question__title")
