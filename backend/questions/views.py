from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render

from .models import Attempt, DifficultyLevel, ExamType, Question, Subject, Topic


@login_required
def question_submit_view(request, question_id):
	question = get_object_or_404(Question, id=question_id, is_published=True)

	if request.method == "POST":
		selected_option = request.POST.get("selected_option")
		if selected_option in {"A", "B", "C", "D"}:
			Attempt.objects.update_or_create(
				user=request.user,
				question=question,
				defaults={"selected_option": selected_option},
			)
	return redirect("questions:list")


def question_list_view(request):
	questions = Question.objects.filter(is_published=True).select_related("subject", "topic")

	exam = request.GET.get("exam")
	subject_id = request.GET.get("subject")
	topic_id = request.GET.get("topic")
	difficulty = request.GET.get("difficulty")

	if exam in {ExamType.JEE, ExamType.NEET, ExamType.BOTH}:
		questions = questions.filter(exam=exam)

	if subject_id:
		questions = questions.filter(subject_id=subject_id)

	if topic_id:
		questions = questions.filter(topic_id=topic_id)

	if difficulty in {DifficultyLevel.EASY, DifficultyLevel.MEDIUM, DifficultyLevel.HARD}:
		questions = questions.filter(difficulty=difficulty)

	subjects = Subject.objects.all()
	topics = Topic.objects.all()

	context = {
		"questions": questions,
		"subjects": subjects,
		"topics": topics,
		"difficulty_choices": DifficultyLevel.choices,
		"exam_choices": ExamType.choices,
	}
	return render(request, "questions/question_list.html", context)
