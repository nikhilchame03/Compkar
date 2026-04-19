from django.db import migrations, models


def populate_serial_numbers(apps, schema_editor):
    Question = apps.get_model("questions", "Question")
    for serial, question in enumerate(Question.objects.order_by("created_at"), start=1):
        if question.serial_number is None:
            question.serial_number = serial
            question.save(update_fields=["serial_number"])


class Migration(migrations.Migration):

    dependencies = [
        ("questions", "0002_alter_question_options_question_serial_number"),
    ]

    operations = [
        migrations.RunPython(populate_serial_numbers, migrations.RunPython.noop),
        migrations.AlterField(
            model_name="question",
            name="serial_number",
            field=models.PositiveIntegerField(unique=True),
        ),
    ]
