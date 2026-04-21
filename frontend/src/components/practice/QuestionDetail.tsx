import "@/styles/practice.css";

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
    <div style={{ padding: "24px", maxWidth: "860px", margin: "0 auto" }}>
      <div
        style={{
          background: "var(--lc-surface)",
          border: "1px solid var(--lc-border)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--lc-border)",
          }}
        >
          <h2
            style={{
              margin: "0 0 12px",
              fontSize: "18px",
              fontWeight: 600,
              color: "var(--lc-text)",
            }}
          >
            {question.title}
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span className="badge-exam">{question.exam}</span>

            <span
              className={`badge-diff badge-${question.difficulty.toLowerCase()}`}
            >
              {question.difficulty.charAt(0) + question.difficulty.slice(1).toLowerCase()}
            </span>

            <span
              style={{
                fontSize: "12px",
                color: "var(--lc-muted)",
                marginLeft: "4px",
              }}
            >
              {question.subject.name} · {question.topic.name}
            </span>
          </div>
        </div>

        {/* Statement */}
        <div style={{ padding: "24px" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--lc-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              margin: "0 0 10px",
            }}
          >
            Problem
          </p>
          <p className="question-statement">{question.statement}</p>
        </div>

        {/* Explanation */}
        {question.explanation && (
          <div
            style={{
              padding: "20px 24px",
              borderTop: "1px solid var(--lc-border)",
              background: "rgba(0, 184, 107, 0.04)",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--lc-green)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                margin: "0 0 10px",
              }}
            >
              Explanation
            </p>
            <p className="question-explanation">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}