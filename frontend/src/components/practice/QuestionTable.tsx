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

type QuestionTableProps = { questions: Question[]; onSelectQuestion: (serial: number) => void; };

export function QuestionTable({ questions, onSelectQuestion }: QuestionTableProps) {
  const easy = questions.filter(q => q.difficulty === "EASY").length;
  const medium = questions.filter(q => q.difficulty === "MEDIUM").length;
  const hard = questions.filter(q => q.difficulty === "HARD").length;

  return (
    <div className="question-list">
      <div className="q-stats-bar">
        <span><span className="q-stat-dot easy" /><span className="q-stat-val">{easy}</span> Easy</span>
        <span><span className="q-stat-dot medium" /><span className="q-stat-val">{medium}</span> Medium</span>
        <span><span className="q-stat-dot hard" /><span className="q-stat-val">{hard}</span> Hard</span>
        <span className="q-total">{questions.length} problems</span>
      </div>
      {questions.length === 0 && <p className="empty-text">No questions match these filters.</p>}
      <table className="question-table">
        <thead>
          <tr>
            <th className="q-col-serial">#</th>
            <th>Title</th>
            <th className="q-col-topic">Topic</th>
            <th className="q-col-exam">Exam</th>
            <th className="q-col-diff">Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id} onClick={() => onSelectQuestion(q.serialNumber)}>
              <td className="q-col-serial">{q.serialNumber}</td>
              <td className="q-col-title">{q.title}</td>
              <td className="q-col-topic">{q.subject.name} · {q.topic.name}</td>
              <td><span className="badge-exam">{q.exam}</span></td>
              <td>
                <span className={`badge-diff badge-${q.difficulty.toLowerCase()}`}>
                  {q.difficulty.charAt(0) + q.difficulty.slice(1).toLowerCase()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}