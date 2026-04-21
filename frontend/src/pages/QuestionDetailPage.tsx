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
  topic: { name: string };
  subject: { name: string };
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
    return (
      <div
        className="practice-page"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          color: "var(--lc-muted)",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!Number.isInteger(serialNumber) || serialNumber < 1 || !question) {
    return (
      <div className="practice-page">
        <nav className="practice-navbar">
          <p className="practice-brand">COMPKAR</p>
        </nav>
        <div style={{ padding: "24px" }}>
          <div className="question-help">
            <p>Invalid question serial. Please go back to the practice dashboard.</p>
            <button className="topic-chip" style={{ marginTop: "12px" }} onClick={() => navigate("/")}>
              ← Back to practice
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="practice-page">
      {/* Navbar */}
      <nav className="practice-navbar">
        <p className="practice-brand">COMPKAR</p>
        <button
          className="topic-chip"
          onClick={() => navigate("/")}
          style={{ fontSize: "13px" }}
        >
          ← Back to practice
        </button>
      </nav>

      {/* Sub-header */}
      <div className="practice-header">
        <div>
          <h1 className="practice-title">Question #{serialNumber}</h1>
          <p className="practice-subtitle">View the selected question in full detail.</p>
        </div>
      </div>

      <QuestionDetail question={question} />
    </div>
  );
}