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
  if (items.length === 0) return null;
  return (
    <>
      <p className="daily-section-header">Daily Questions</p>
      <div className="daily-list">
        {items.map((item) => (
          <article className="daily-item" key={item.id}>
            <p className="daily-date">{item.date}</p>
            <p>{item.question.title}</p>
          </article>
        ))}
      </div>
    </>
  );
}