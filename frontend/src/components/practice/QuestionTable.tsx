import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Question = {
  id: string;
  serialNumber: number;
  exam: string;
  difficulty: string;
  title: string;
  statement: string;
  explanation?: string;
  topic: {
    name: string;
  };
  subject: {
    name: string;
  };
};

type QuestionTableProps = {
  questions: Question[];
  onSelectQuestion: (serial: number) => void;
};

export function QuestionTable({
  questions,
  onSelectQuestion,
}: QuestionTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Question Bank</CardTitle>
        <CardDescription>
          Browse and solve by topic, exam, and level.
        </CardDescription>
      </CardHeader>

      <CardContent className="question-list">
        {questions.length === 0 && (
          <p className="empty-text">
            No questions match these filters.
          </p>
        )}

        {questions.map((question) => (
          <article
            key={question.id}
            className="question-item cursor-pointer"
            onClick={() => onSelectQuestion(question.serialNumber)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSelectQuestion(question.serialNumber);
              }
            }}
          >
            <div className="question-head">
              <div className="question-number">
                #{question.serialNumber}
              </div>

              <div>
                <h3>{question.title}</h3>

                <div className="question-tags">
                  <Badge>{question.exam}</Badge>
                  <Badge className="bg-muted text-foreground">
                    {question.difficulty}
                  </Badge>
                </div>
              </div>
            </div>

            <p className="question-meta">
              {question.subject.name} • {question.topic.name}
            </p>

            <p className="question-statement">
              {question.statement}
            </p>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}