from django.core.management.base import BaseCommand

from questions.models import ExamType, Subject, Topic


SYLLABUS = {
    ExamType.JEE: {
        "Physics": [
            "Mechanics",
            "Electrostatics",
            "Current Electricity",
            "Magnetism",
            "Optics",
            "Modern Physics",
            "Thermodynamics",
        ],
        "Chemistry": [
            "Physical Chemistry",
            "Organic Chemistry",
            "Inorganic Chemistry",
            "Chemical Bonding",
            "Coordination Compounds",
            "Thermodynamics",
            "Solutions",
        ],
        "Mathematics": [
            "Algebra",
            "Calculus",
            "Coordinate Geometry",
            "Trigonometry",
            "Vectors and 3D",
            "Probability",
            "Statistics",
        ],
    },
    ExamType.NEET: {
        "Physics": [
            "Mechanics",
            "Electrodynamics",
            "Waves and Optics",
            "Modern Physics",
            "Thermodynamics",
        ],
        "Chemistry": [
            "Physical Chemistry",
            "Organic Chemistry",
            "Inorganic Chemistry",
            "Biomolecules",
            "Environmental Chemistry",
        ],
        "Botany": [
            "Cell Biology",
            "Genetics",
            "Plant Physiology",
            "Ecology",
            "Reproduction in Plants",
        ],
        "Zoology": [
            "Human Physiology",
            "Genetics and Evolution",
            "Reproduction",
            "Biotechnology",
            "Ecology",
        ],
    },
}


class Command(BaseCommand):
    help = "Seed common JEE and NEET subjects/topics into database"

    def handle(self, *args, **options):
        created_subjects = 0
        created_topics = 0

        for exam, subjects in SYLLABUS.items():
            for subject_name, topics in subjects.items():
                subject, subject_created = Subject.objects.get_or_create(exam=exam, name=subject_name)
                if subject_created:
                    created_subjects += 1

                for topic_name in topics:
                    _, topic_created = Topic.objects.get_or_create(subject=subject, name=topic_name)
                    if topic_created:
                        created_topics += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Syllabus seeding complete. Subjects added: {created_subjects}, Topics added: {created_topics}."
            )
        )
