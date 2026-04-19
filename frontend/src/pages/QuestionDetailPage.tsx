import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QuestionDetail } from "@/components/practice/QuestionDetail";
import { GET_QUESTION_BY_SERIAL } from "@/graphql/queries";
import "@/styles/practice.css";

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

export function QuestionDetailPage() {
  const navigate = useNavigate();
  const { serial } = useParams<{ serial: string }>();
  const serialNumber = Number(serial);

  const { data, loading } = useQuery<{ questionBySerial: Question }>(GET_QUESTION_BY_SERIAL, {
    variables: { serial: serialNumber },
    skip: Number.isNaN(serialNumber),
  });

  const question = data?.questionBySerial ?? null;

  if (loading) {
    return <div className="practice-page">Loading question...</div>;
  }

  if (!Number.isInteger(serialNumber) || serialNumber < 1 || !question) {
    return (
      <div className="practice-page">
        <div className="question-help">
          <p>Invalid question serial. Please go back to the practice dashboard.</p>
          <button className="topic-chip" onClick={() => navigate("/")}>Back to practice</button>
        </div>
      </div>
    );
  }

  return (
    <div className="practice-page">
      <div className="practice-header">
        <div>
          <p className="practice-brand">Practice</p>
          <h1 className="practice-title">Question #{serialNumber}</h1>
          <p className="practice-subtitle">View the selected question in full detail.</p>
        </div>
        <button className="topic-chip" onClick={() => navigate("/")}>Back to practice</button>
      </div>
      <QuestionDetail question={question} />
    </div>
  );
}
