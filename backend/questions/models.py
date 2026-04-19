from django.db import models
from django.db.models import Max
from django.conf import settings


class ExamType(models.TextChoices):
	JEE = "JEE", "JEE"
	NEET = "NEET", "NEET"
	BOTH = "BOTH", "Both"


class DifficultyLevel(models.TextChoices):
	EASY = "EASY", "Easy"
	MEDIUM = "MEDIUM", "Medium"
	HARD = "HARD", "Hard"


class Subject(models.Model):
	exam = models.CharField(max_length=10, choices=ExamType.choices, default=ExamType.JEE)
	name = models.CharField(max_length=100)

	class Meta:
		unique_together = ("exam", "name")
		ordering = ["exam", "name"]

	def __str__(self):
		return f"{self.exam} - {self.name}"


class Topic(models.Model):
	subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="topics")
	name = models.CharField(max_length=120)

	class Meta:
		unique_together = ("subject", "name")
		ordering = ["subject__name", "name"]

	def __str__(self):
		return f"{self.subject.name}: {self.name}"


class Question(models.Model):
	serial_number = models.PositiveIntegerField(unique=True)
	exam = models.CharField(max_length=10, choices=ExamType.choices, default=ExamType.JEE)
	subject = models.ForeignKey(Subject, on_delete=models.PROTECT, related_name="questions")
	topic = models.ForeignKey(Topic, on_delete=models.PROTECT, related_name="questions")
	difficulty = models.CharField(max_length=10, choices=DifficultyLevel.choices, default=DifficultyLevel.EASY)
	title = models.CharField(max_length=255)
	statement = models.TextField()
	option_a = models.CharField(max_length=255)
	option_b = models.CharField(max_length=255)
	option_c = models.CharField(max_length=255)
	option_d = models.CharField(max_length=255)
	correct_option = models.CharField(max_length=1, choices=(("A", "A"), ("B", "B"), ("C", "C"), ("D", "D")))
	explanation = models.TextField(blank=True)
	source = models.CharField(max_length=255, blank=True)
	is_published = models.BooleanField(default=True)
	created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ["serial_number"]

	def save(self, *args, **kwargs):
		if self.serial_number is None:
			max_serial = Question.objects.aggregate(max_serial=Max("serial_number"))["max_serial"] or 0
			self.serial_number = max_serial + 1
		super().save(*args, **kwargs)

	def __str__(self):
		return self.title


class DailyQuestion(models.Model):
	date = models.DateField(unique=True)
	question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="daily_slots")

	class Meta:
		ordering = ["-date"]

	def __str__(self):
		return f"{self.date} - {self.question.title}"


class Attempt(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="attempts")
	question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="attempts")
	selected_option = models.CharField(max_length=1, choices=(("A", "A"), ("B", "B"), ("C", "C"), ("D", "D")))
	is_correct = models.BooleanField(default=False)
	attempted_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ["-attempted_at"]
		unique_together = ("user", "question")

	def save(self, *args, **kwargs):
		self.is_correct = self.selected_option == self.question.correct_option
		super().save(*args, **kwargs)

# Create your models here.
