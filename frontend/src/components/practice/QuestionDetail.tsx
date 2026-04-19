import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type QuestionDetailProps = {
  question: {
    id: string;
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
};

export function QuestionDetail({ question }: QuestionDetailProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{question.title}</CardTitle>
      </CardHeader>
      <CardContent className="question-preview">
        <div className="question-head">
          <div>
            <Badge>{question.exam}</Badge>
            <Badge className="bg-muted text-foreground">{question.difficulty}</Badge>
          </div>
          <p className="question-meta">
            {question.subject.name} • {question.topic.name}
          </p>
        </div>
        <div>
          <p className="question-statement">{question.statement}</p>
          {question.explanation ? (
            <div>
              <h4>Explanation</h4>
              <p className="question-explanation">{question.explanation}</p>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
