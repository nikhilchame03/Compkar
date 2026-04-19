from django.urls import path

from .views import question_list_view, question_submit_view

app_name = "questions"

urlpatterns = [
    path("", question_list_view, name="list"),
    path("<int:question_id>/submit/", question_submit_view, name="submit"),
]
