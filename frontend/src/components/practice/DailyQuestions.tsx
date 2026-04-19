import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type DailyQuestion = {
  id: string;
  date: string;
  question: {
    id: string;
    title: string;
  };
};

type DailyQuestionsProps = {
  items: DailyQuestion[];
};

export function DailyQuestions({ items }: DailyQuestionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Questions</CardTitle>
        <CardDescription>Start from the daily set to build consistency.</CardDescription>
      </CardHeader>
      <CardContent className="daily-list">
        {items.length === 0 ? <p className="empty-text">No daily question assigned yet.</p> : null}
        {items.map((item) => (
          <article className="daily-item" key={item.id}>
            <p className="daily-date">{item.date}</p>
            <p>{item.question.title}</p>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
